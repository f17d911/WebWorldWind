/*
 * Copyright (C) 2017 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
define([
    '../../../geom/Location',
    '../../../geom/Position',
    '../WktElements',
    './WktObject',
    '../WktType'
], function (Location,
             Position,
             WktElements,
             WktObject,
             WktType) {
    /**
     * This item can contain other geometries to be shown.
     * @alias WktGeometryCollection
     * @augments WktObject
     * @constructor
     */
    var WktGeometryCollection = function () {
        WktObject.call(this, WktType.SupportedGeometries.GEOMETRY_COLLECTION);

        this.objects = [];
    };

    WktGeometryCollection.prototype = Object.create(WktObject.prototype);

    /**
     * It takes an object and adds it among those, it will render
     * @param object {WKTObject} Object to be added to this collection.
     */
    WktGeometryCollection.prototype.add = function (object) {
        this.objects.push(object);
    };

    /**
     * In geometry collection the coordinates should belong to the currently parsed object.
     * Array containing latitude, longitude and potentially either altitude or LRS.
     * @inheritDoc
     */
    WktGeometryCollection.prototype.addCoordinates = function (coordinates) {
        var object = this.objects[this.objects.length - 1];
        if (this._is3d) {
            object.coordinates.push(new Position(coordinates[0], coordinates[1], coordinates[2] || 0));
        } else {
            object.coordinates.push(new Location(coordinates[0], coordinates[1]));
        }
    };

    /**
     * It returns representation for all shapes in the GeometryCollection.
     * @inheritDoc
     * @return {Renderable[]}
     */
    WktGeometryCollection.prototype.shapes = function () {
        var shapes = [];

        this.objects.forEach(function (associatedShapes) {
            associatedShapes.shapes().forEach(function (shape) {
                shapes.push(shape);
            });
        });

        return shapes;
    };

    WktElements['GEOMETRYCOLLECTION'] = WktGeometryCollection;

    return WktGeometryCollection;
});