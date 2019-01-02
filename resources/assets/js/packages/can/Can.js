export default function (Vue) {
    Vue.can = {
        permission(meta) {
            let permissions = this.getPermissionCookie()
            if (meta.restricted)
                return permissions.includes(meta.permission)
            else
                return true
        },
        getPermissionCookie() {
            let ar = []
            document.cookie.split(';').forEach(element => {
                let part = element.split('=')
                ar[part[0].trim()] = part[1]
            });
            return ar['permissions'] ? ar['permissions'].split(',') : []
        }
    }

    Object.defineProperties(Vue.prototype, {
        $can: {
            get: () => {
                return Vue.can
            }
        }
    })
}