"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { homeServiceAreaGroups } from "../home-content";
import "leaflet/dist/leaflet.css";
import "../service-area-map.css";

// City-centre markers identify service locations, rather than venue addresses.
const cities = [
  { name: "Toronto", lat: 43.6532, lng: -79.3832, region: 0 },
  { name: "North York", lat: 43.7615, lng: -79.4111, region: 0 },
  { name: "Scarborough", lat: 43.7764, lng: -79.2318, region: 0 },
  { name: "Etobicoke", lat: 43.6205, lng: -79.5132, region: 0 },
  { name: "Markham", lat: 43.8561, lng: -79.337, region: 1 },
  { name: "Vaughan", lat: 43.8361, lng: -79.4983, region: 1 },
  { name: "Richmond Hill", lat: 43.8828, lng: -79.4403, region: 1 },
  { name: "Aurora", lat: 44.0065, lng: -79.4504, region: 1 },
  { name: "Newmarket", lat: 44.0592, lng: -79.4613, region: 1 },
  { name: "King City", lat: 43.9297, lng: -79.5278, region: 1 },
  { name: "Thornhill", lat: 43.8152, lng: -79.4241, region: 1 },
  { name: "Mississauga", lat: 43.589, lng: -79.6441, region: 2 },
  { name: "Brampton", lat: 43.7315, lng: -79.7624, region: 2 },
  { name: "Oakville", lat: 43.4675, lng: -79.6877, region: 2 },
  { name: "Burlington", lat: 43.3255, lng: -79.799, region: 2 },
  { name: "Milton", lat: 43.5183, lng: -79.8774, region: 2 },
  { name: "Pickering", lat: 43.8384, lng: -79.0868, region: 3 },
  { name: "Ajax", lat: 43.8509, lng: -79.0204, region: 3 },
  { name: "Whitby", lat: 43.8975, lng: -78.9429, region: 3 },
  { name: "Oshawa", lat: 43.8971, lng: -78.8658, region: 3 },
];
const filters = ["All areas", "Toronto", "York / North GTA", "West GTA", "East GTA"];

export function ServiceAreaMap({ introduction }: { introduction: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [nearby, setNearby] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [region, setRegion] = useState(-1);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); observer.disconnect(); }
    }, { rootMargin: "250px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearby || !canvasRef.current) return;
    let disposed = false;
    let resize: ResizeObserver | undefined;
    let map: LeafletMap | undefined;
    import("leaflet").then(L => {
      if (disposed || !canvasRef.current) return;
      map = L.map(canvasRef.current, {
        scrollWheelZoom: false,
        dragging: !L.Browser.mobile,
        zoomControl: false,
        minZoom: 8, maxZoom: 13,
      });
      mapRef.current = map;
      map.attributionControl.setPrefix(false);
      L.control.zoom({ position: "topright" }).addTo(map);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      markersRef.current = cities.map(item => {
        const marker = L.marker([item.lat, item.lng], {
          title: item.name, alt: item.name, autoPanOnFocus: false,
          icon: L.divIcon({ className: "luxe-map-pin", html: '<span></span>', iconSize: [32, 32], iconAnchor: [16, 16] }),
        }).addTo(map!);
        const label = document.createElement("div");
        label.className = "luxe-map-popup-label";
        label.textContent = item.name;
        marker.bindPopup(label, { closeButton: true, autoPan: false });
        marker.bindTooltip(item.name, { direction: "top", offset: [0, -10], opacity: 1, className: "luxe-map-tooltip" });
        marker.on("add", () => {
          const element = marker.getElement();
          if (element) {
            element.onfocus = () => marker.openTooltip();
            element.onblur = () => marker.closeTooltip();
          }
        });
        const element = marker.getElement();
        if (element) {
          element.onfocus = () => marker.openTooltip();
          element.onblur = () => marker.closeTooltip();
        }
        marker.on("click", () => setCity(item.name));
        return marker;
      });
      resize = new ResizeObserver(() => map?.invalidateSize({ pan: false }));
      resize.observe(canvasRef.current);
      map.fitBounds(L.latLngBounds(cities.map(item => [item.lat, item.lng])), { padding: [36, 36], animate: false });
      setReady(true);
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; resize?.disconnect(); map?.remove(); mapRef.current = null; markersRef.current = []; };
  }, [nearby]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    const visible = cities.filter(item => region === -1 || item.region === region);
    markersRef.current.forEach((marker, index) => {
      const active = region === -1 || cities[index].region === region;
      if (active && !map.hasLayer(marker)) marker.addTo(map);
      if (!active && map.hasLayer(marker)) marker.remove();
    });
    map.closePopup();
    map.fitBounds(visible.map(item => [item.lat, item.lng] as [number, number]), { padding: [38, 38], maxZoom: 11, animate: false });
  }, [region, ready]);

  useEffect(() => {
    if (!city || !ready || !mapRef.current) return;
    const index = cities.findIndex(item => item.name === city);
    const marker = markersRef.current[index];
    if (marker) {
      if (mapRef.current.hasLayer(marker)) marker.openPopup();
      else mapRef.current.closePopup();
    }
  }, [city, ready, region]);

  function selectRegion(index: number) { setRegion(index); setCity(null); }
  function selectCity(name: string) {
    const item = cities.find(item => item.name === name);
    if (!item) return;
    setCity(name);
    const frame = canvasRef.current?.parentElement;
    if (frame) {
      const headerBottom = document.querySelector(".foundation-header")?.getBoundingClientRect().bottom ?? 0;
      window.scrollTo({
        top: window.scrollY + frame.getBoundingClientRect().top - Math.max(0, headerBottom) - 24,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }

  return (
    <div className="luxe-service-map" ref={sectionRef}>
      <div className="luxe-service-overview">
        <div className="luxe-service-intro-column">
          {introduction}
        </div>
      <div className="luxe-map-directory-column">
      <div className="luxe-map-directory" aria-label="Cities and districts served">
        {homeServiceAreaGroups.slice(0, 4).map((group, index) => (
          <div key={group.label} className={region === index ? "is-active-region" : undefined}>
            <h3>{group.label}</h3>
            <div className="luxe-map-city-badges">{group.places.map(name => <button type="button" key={name} aria-pressed={city === name} onClick={() => selectCity(name)}>{name}</button>)}</div>
          </div>
        ))}
      </div>
        <p className="luxe-map-regional-note"><strong>* Beyond the GTA</strong><span>Select larger events throughout Southern Ontario. Share your venue when you inquire.</span></p>
      </div>
      </div>
      <div className="luxe-map-toolbar">
        <div className="luxe-map-filters" role="group" aria-label="Filter service areas">
          {filters.map((label, index) => <button key={label} type="button" aria-pressed={region === index - 1} onClick={() => selectRegion(index - 1)}>{label}</button>)}
        </div>
        <span className="luxe-map-count">{region === -1 ? "20 cities & districts" : `${cities.filter(item => item.region === region).length} cities & districts`}</span>
      </div>
      <div className="luxe-map-frame">
        <div ref={canvasRef} className="luxe-geographic-map" role="region" aria-label="Map of Luxe service cities in Toronto and the Greater Toronto Area" />
        {!ready && <div className="luxe-map-loading" role="status">{failed ? "Explore our service cities below." : "Loading service areas…"}</div>}
      </div>
    </div>
  );
}
