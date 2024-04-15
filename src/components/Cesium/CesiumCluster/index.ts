/**
 * @description: 将图片和文字合成新图标使用（参考Cesium源码）
 * @param {*} url：图片地址
 * @param {*} label：文字
 * @param {*} size：画布大小
 * @return {*} 返回canvas
 */
import * as Cesium from 'cesium'

let canvas
let promise
const combineIconAndLabel = (url: any, label: string, size: number) => {
	removeIconAndLabel()
    // 创建画布对象
	canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'iconAndLabel')
    canvas.width = size;
    canvas.height = size;
    let ctx = canvas.getContext("2d");

    // @ts-ignore
	promise = new Cesium.Resource.fetchImage(url).then(image => {
        // 异常判断
        try {
            // @ts-ignore
            ctx.drawImage(image, 0, 0, size, size);
        } catch (e) {
            console.log(e);
        }
        // 渲染字体
        // font属性设置顺序：font-style, font-variant, font-weight, font-size, line-height, font-family
        // @ts-ignore
        ctx.fillStyle = Cesium.Color.WHITE.toCssColorString();
        // @ts-ignore
        ctx.font = 'bold 20px Microsoft YaHei';
        // @ts-ignore
        ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // @ts-ignore
        ctx.fillText(label, size / 2, size / 2 + 8);

        return canvas;
    });
    return promise;
}

const removeIconAndLabel = () => {
	if(document.querySelector('#iconAndLabel')){
		document.querySelector('#iconAndLabel').remove()
	}
	if(promise){
		promise = null
	}
}


let addData
let dataArr = []

/**
 * @description: 点聚合功能效果
 * @param {*} viewer
 * @param {*} geojson 数据源
 * @param {*} dataSourceName 自定义数据名称
 * @return {*}
 */
export const cesiumCluster = (viewer:any, geojson:any) => {
	removeDataSources(viewer)
	addData = new Cesium.GeoJsonDataSource().load(geojson)
	addData.then(dataSource => {
        viewer.dataSources.add(dataSource);
        // 设置聚合参数
        dataSource.clustering.enabled = true;
        dataSource.clustering.pixelRange = 0.1;
        dataSource.clustering.minimumClusterSize = 2;

        // foreach用于调用数组的每个元素，并将元素传递给回调函数。
        dataSource.entities.values.forEach(entity => {
            // 将点拉伸一定高度，防止被地形压盖
            // @ts-ignore
            entity.position._value.z += 50.0;
            // 使用大小为64*64的icon，缩小展示poi
            entity.billboard = {
                // @ts-ignore
                image: '/src/components/Cesium/CesiumCluster/blueEnterprise.png',
                // @ts-ignore
                width: 32,
                // @ts-ignore
                height: 32,
            };
            // @ts-ignore
	        entity.label = {
                // @ts-ignore
                text: '单个点',
                // @ts-ignore
                font: 'bold 15px Microsoft YaHei',
		        // @ts-ignore
		        fillColor: Cesium.Color.RED,
                // 竖直对齐方式
                // @ts-ignore
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                // 水平对齐方式
                // @ts-ignore
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                // 偏移量
                // @ts-ignore
                pixelOffset: new Cesium.Cartesian2(15, 0),
            }
        });

        // 添加监听函数
        dataSource.clustering.clusterEvent.addEventListener(
            (clusteredEntities: any, cluster:any) => {
                // 关闭自带的显示聚合数量的标签
                cluster.label.show = false;
                cluster.billboard.show = true;
                cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                
                // 根据聚合数量的多少设置不同层级的图片以及大小
                if (clusteredEntities.length >= 5) {
                    cluster.billboard.image = combineIconAndLabel('/src/components/Cesium/CesiumCluster/cluster0.png', clusteredEntities.length, 64);
                    cluster.billboard.width = 72;
                    cluster.billboard.height = 72;
                } else if (clusteredEntities.length >= 4) {
                    cluster.billboard.image = combineIconAndLabel('/src/components/Cesium/CesiumCluster/cluster1.png', clusteredEntities.length, 64);
                    cluster.billboard.width = 56;
                    cluster.billboard.height = 56;
                } else if (clusteredEntities.length >= 3) {
                    cluster.billboard.image = combineIconAndLabel('/src/components/Cesium/CesiumCluster/cluster2.png', clusteredEntities.length, 64);
                    cluster.billboard.width = 48;
                    cluster.billboard.height = 48;
                } else {
                    cluster.billboard.image = combineIconAndLabel('/src/components/Cesium/CesiumCluster/cluster3.png', clusteredEntities.length, 64);
                    cluster.billboard.width = 40;
                    cluster.billboard.height = 40;
                }
            }
        )
		
		dataArr.push({
			data: dataSource
		})
    });
}

const removeDataSources = (viewer) => {
	if(addData){
		addData = null
	}
	
	for (let i = 0; i < dataArr.length; i++) {
		viewer.dataSources.remove(dataArr[i].data);
	}
}
