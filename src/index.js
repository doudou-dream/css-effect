export class collect {
    dataArr = []

    constructor(array) {
        this.dataArr = array
    }

    /**
     * 获取
     * @param {"name,name1"|["name","name1"]}any
     */
    select(any) {
        if (typeof any === 'string') {
            any = any.split(',')
        }
        if (Array.isArray(any)) {
            this.dataArr = this.dataArr.map(v => {
                const keys = Object.keys(v)
                const newKeys = any.filter(val => val === !keys.includes(val))
                newKeys?.forEach(key => {
                    delete v[key]
                })
                return v
            })
        }
    }

    /**
     * 查询条件
     * @param {string} name
     * @param {string|number} option
     * @param {string|number} value
     */
    where(name = '', option = '=', value = '') {
        if (!value) {
            this.dataArr.filter(v => v[name] === option)
        } else {
            switch (option) {
                case '>':
                    this.dataArr.filter(v => v[name] > value)
                    break
                case '<':
                    this.dataArr.filter(v => v[name] < value)
                    break
                case '=':
                    this.dataArr.filter(v => v[name] = value)
                    break
                case '<=':
                    this.dataArr.filter(v => v[name] <= value)
                    break
                case '>=':
                    this.dataArr.filter(v => v[name] >= value)
                    break
            }
        }
    }

    /**
     * 返回一条数据
     * @returns {{}|*}
     */
    first() {
        if (this.dataArr?.length > 0) {
            return this?.dataArr[0]
        }
        return {}
    }

    /**
     * 返回所有条件
     * @returns {*[]}
     */
    get() {
        return this.dataArr || []
    }

    /**
     * 返回一维数组
     * @param name
     * @returns {unknown[] | undefined}
     */
    pluck(name) {
        return this.dataArr?.map(v => v[name]) || []
    }

    /**
     * 返回数据总数
     * @returns {number}
     */
    count() {
        return this.dataArr?.length || 0
    }
}