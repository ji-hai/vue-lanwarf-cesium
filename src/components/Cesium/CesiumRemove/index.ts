/**
 * @description: 根据 id 移除 entity
 * @param {*} viewer
 * @param {*} id entity id
 * @return {*}
 */

export const cesiumRemoveEntityById = (viewer: any, id: string) => {
	const removeId = viewer.entities.getById(id)
	if(removeId){
		viewer.entities.removeById(removeId)
	}
}

/**
 * @description: 根据数据源名称清除数据源
 * @param {*} viewer
 * @param {*} dataSourceName 自定义数据名称
 * @return {*}
 */
export const removeDataSourcesByName = (viewer:any, dataSourceName: string) => {
    for (let i =0;i< viewer.dataSources.getByName(dataSourceName).length; i++){
        viewer.dataSources.remove(viewer.dataSources.getByName(dataSourceName)[i])
    }
}

/**
 * @description: 清除全部数据源
 * @param {*} viewer
 * @return {*}
 */
export const removeAllDataSources = (viewer:any) => {
    viewer.dataSources.removeAll()
}
