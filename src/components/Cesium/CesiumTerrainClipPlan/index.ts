import * as Cesium from 'cesium'

class TerrainClipPlan {
  declare viewer: any
  declare _positions: object
  declare _height: number
  declare bottomImg: string
  declare wallImg: string
  declare splitNum: number
  declare excavateMinHeight: number
  declare wellData: any
  constructor({ viewer, positions = {}, height = 0, bottomImg, wallImg, splitNum = 50 }) {
    this.viewer = viewer
    this._positions = positions
    this._height = height || 0
    this.bottomImg = bottomImg
    this.wallImg = wallImg
    this.splitNum = splitNum
    this.excavateMinHeight = 0
    this.wellData = null
    this._positions && this._positions.length > 0 && this.updateData(this._positions)
  }

  get show() {
    return this._show
  }

  set show(e) {
    ;(this._show = e),
      this.viewer.scene.globe.clippingPlanes &&
        (this.viewer.scene.globe.clippingPlanes.enabled = e),
      this._switchExcavate(e)
  }

  get height() {
    return this._height
  }

  set height(e) {
    ;(this._height = e), this._updateExcavateDepth(e)
  }

  updateData(e) {
    this.clear()
    const t = [],
      i = e.length,
      a = new Cesium.Cartesian3(),
      n = Cesium.Cartesian3.subtract(e[0], e[1], a)

    if (n.x > 0) this.excavateMinHeight = 9999

    for (let r = 0; r < i - 1; ++r) {
      const s = (r + 1) % i,
        l = Cesium.Cartesian3.midpoint(e[r], e[s], new Cesium.Cartesian3()),
        u = Cesium.Cartographic.fromCartesian(e[r]),
        c = this.viewer.scene.globe.getHeight(u) || u.height

      c < this.excavateMinHeight && (this.excavateMinHeight = c)
      let d,
        h = Cesium.Cartesian3.normalize(l, new Cesium.Cartesian3())

      d = n
        ? Cesium.Cartesian3.subtract(e[r], l, new Cesium.Cartesian3())
        : Cesium.Cartesian3.subtract(e[s], l, new Cesium.Cartesian3())

      d = Cesium.Cartesian3.normalize(d, d)

      let f = Cesium.Cartesian3.cross(d, h, new Cesium.Cartesian3())

      f = Cesium.Cartesian3.normalize(f, f)
      const p = new Cesium.Plane(f, 0),
        m = Cesium.Plane.getPointDistance(p, l)
      t.push(new Cesium.ClippingPlane(f, m))
    }

    this.viewer.scene.globe.depthTestAgainstTerrain = true
    this.viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
      planes: t,
      edgeWidth: 1,
      edgeColor: Cesium.Color.WHITE,
      enabled: true
    })
    this._prepareWell(e)
    this._createWell(this.wellData)
  }

  clear() {
    this.viewer.scene.globe.clippingPlanes &&
      ((this.viewer.scene.globe.clippingPlanes.enabled = !1),
      this.viewer.scene.globe.clippingPlanes.removeAll(),
      this.viewer.scene.globe.clippingPlanes.isDestroyed() ||
        this.viewer.scene.globe.clippingPlanes.destroy()),
      (this.viewer.scene.globe.clippingPlanes = void 0),
      this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface),
      this.wellWall && this.viewer.scene.primitives.remove(this.wellWall),
      delete this.bottomSurface,
      delete this.wellWall,
      this.viewer.scene.render()
  }

  _prepareWell(e) {
    const t = this.splitNum,
      i = e.length
    if (0 != i) {
      for (
        var a = this.excavateMinHeight - this.height, n = [], r = [], s = [], l = 0;
        l < i;
        l++
      ) {
        const u = l == i - 1 ? 0 : l + 1,
          c = Cesium.Cartographic.fromCartesian(e[l]),
          d = Cesium.Cartographic.fromCartesian(e[u]),
          h = [c.longitude, c.latitude],
          f = [d.longitude, d.latitude]

        0 == l &&
          (s.push(new Cesium.Cartographic(h[0], h[1])),
          r.push(Cesium.Cartesian3.fromRadians(h[0], h[1], a)),
          n.push(Cesium.Cartesian3.fromRadians(h[0], h[1], 0)))

        for (let p = 1; p <= t; p++) {
          const m = Cesium.Math.lerp(h[0], f[0], p / t),
            g = Cesium.Math.lerp(h[1], f[1], p / t)
          ;(l == i - 1 && p == t) ||
            (s.push(new Cesium.Cartographic(m, g)),
            r.push(Cesium.Cartesian3.fromRadians(m, g, a)),
            n.push(Cesium.Cartesian3.fromRadians(m, g, 0)))
        }
      }
      this.wellData = {
        lerp_pos: s,
        bottom_pos: r,
        no_height_top: n
      }
    }
  }

  _createWell(e) {
    console.log(e);
    
    if (Boolean(this.viewer.terrainProvider._layers)) {
      const t = this
      this._createBottomSurface(e.bottom_pos)
      const i = Cesium.sampleTerrainMostDetailed(this.viewer.terrainProvider, e.lerp_pos)
      Cesium.when(i, function (i) {
        for (var a = i.length, n = [], r = 0; r < a; r++) {
          const s = Cesium.Cartesian3.fromRadians(i[r].longitude, i[r].latitude, i[r].height)
          n.push(s)
        }
        t._createWellWall(e.bottom_pos, n)
      })
    } else {
      this._createBottomSurface(e.bottom_pos)
      this._createWellWall(e.bottom_pos, e.no_height_top)
    }
  }

  _getMinHeight(e) {
    let minHeight = 5000000
    let minPoint = null
    for (let i = 0; i < e.length; i++) {
      const height = e[i]['z']
      if (height < minHeight) {
        minHeight = height
        minPoint = this._ellipsoidToLonLat(e[i])
      }
    }
    return minPoint.altitude
  }

  _ellipsoidToLonLat(c) {
    const ellipsoid = this.viewer.scene.globe.ellipsoid
    const cartesian3 = new Cesium.Cartesian3(c.x, c.y, c.z)
    const cartographic = ellipsoid.cartesianToCartographic(cartesian3)
    const lat = Cesium.Math.toDegrees(cartographic.latitude)
    const lng = Cesium.Math.toDegrees(cartographic.longitude)
    const alt = cartographic.height
    return {
      longitude: lng,
      latitude: lat,
      altitude: alt
    }
  }

  _createBottomSurface(e) {
    if (e.length) {
      const minHeight = this._getMinHeight(e)
      const positions = []
      for (let i = 0; i < e.length; i++) {
        const p = this._ellipsoidToLonLat(e[i])
        positions.push(p.longitude)
        positions.push(p.latitude)
        positions.push(minHeight)
      }

      const polygon = new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArrayHeights(positions)
        ),
        perPositionHeight: true
      })
      const geometry = Cesium.PolygonGeometry.createGeometry(polygon)

      const i = new Cesium.Material({
          fabric: {
            type: 'Image',
            uniforms: {
              image: this.bottomImg
            }
          }
        }),
        a = new Cesium.MaterialAppearance({
          translucent: !1,
          flat: !0,
          material: i
        })
      ;(this.bottomSurface = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: geometry
        }),
        appearance: a,
        asynchronous: !1
      })),
        this.viewer.scene.primitives.add(this.bottomSurface)
    }
  }

  _createWellWall(e, t) {
    const minHeight = this._getMinHeight(e)
    const maxHeights = []
    const minHeights = []
    for (let i = 0; i < t.length; i++) {
      maxHeights.push(this._ellipsoidToLonLat(t[i]).altitude)
      minHeights.push(minHeight)
    }
    const wall = new Cesium.WallGeometry({
      positions: t,
      maximumHeights: maxHeights,
      minimumHeights: minHeights
    })
    const geometry = Cesium.WallGeometry.createGeometry(wall)
    const a = new Cesium.Material({
        fabric: {
          type: 'Image',
          uniforms: {
            image: this.wallImg
          }
        }
      }),
      n = new Cesium.MaterialAppearance({
        translucent: !1,
        flat: !0,
        material: a
      })
    ;(this.wellWall = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: geometry,
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.GREY)
        },
        id: 'PitWall'
      }),
      appearance: n,
      asynchronous: !1
    })),
      this.viewer.scene.primitives.add(this.wellWall)
  }
  _switchExcavate(e) {
    e
      ? ((this.viewer.scene.globe.material = Cesium.Material.fromType('WaJue')),
        (this.wellWall.show = !0),
        (this.bottomSurface.show = !0))
      : ((this.viewer.scene.globe.material = null),
        (this.wellWall.show = !1),
        (this.bottomSurface.show = !1))
  }
  _updateExcavateDepth(e) {
    this.bottomSurface && this.viewer.scene.primitives.remove(this.bottomSurface),
      this.wellWall && this.viewer.scene.primitives.remove(this.wellWall)
    for (var t = this.wellData.lerp_pos, i = [], a = t.length, n = 0; n < a; n++)
      i.push(
        Cesium.Cartesian3.fromRadians(t[n].longitude, t[n].latitude, this.excavateMinHeight - e)
      )
    ;(this.wellData.bottom_pos = i),
      this._createWell(this.wellData),
      this.viewer.scene.primitives.add(this.bottomSurface),
      this.viewer.scene.primitives.add(this.wellWall)
  }
}

export default TerrainClipPlan
