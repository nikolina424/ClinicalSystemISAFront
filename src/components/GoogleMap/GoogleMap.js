import React from 'react';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class GoogleMap extends React.PureComponent {
    render() {
        return (
            <LeafletMap
        center={[this.props.longitude, this.props.latitude]}
        zoom={15}
        maxZoom={25}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[this.props.longitude, this.props.latitude]}>
          <Popup>
            Klinika: Svetlost, Bulevar Oslobodjenja 50
          </Popup>
        </Marker>
      </LeafletMap>
        );
    }
}

export default GoogleMap;