export type iRecursive = { 
    label?: string;
    to?: string;
    children?: iRecursive[];
    [key: string]: any;
};
const recursiveForEach = (item: iRecursive, callback: (node: iRecursive) => void) => {
    // 1. 현재 노드에 대해 콜백 함수 실행
    callback(item);

    // 2. 'children' 속성이 있고, 배열이며, 비어있지 않다면
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {

        // 3. 모든 자식 노드를 순회하며 재귀 호출
        for (const child of item.children) {
            recursiveForEach(child, callback);
        }
    }
};

const getCurrentNav = (currentPath: string) => {
    const navs = useAppConfig().navs;

    const root = { to: '/NOT_FOUND', children: navs };

    let found: iRecursive | undefined;
    recursiveForEach(root, (node) => {
        if (node?.to == currentPath) {
            found = node;
        }
    });
    return found;
}
const getCurrentParent = (currentPath: string) => {
    const navs = useAppConfig().navs;

    const root = { to: '/NOT_FOUND', children: navs };

    let found: iRecursive | undefined;
    recursiveForEach(root, (node) => {
        if (node?.children?.some(child => child.to == currentPath)) {
            found = node;
        }
    });
    return found;
}

export const useNavSiblings = (path: string | Ref<string>) => {

    
    return useAsyncData(`the-nav-siblings-${unref(path)}`, async () => {
        const currentNav = getCurrentParent(unref(path));

        return currentNav;
    }, {
        watch: [() => unref(path)]
    });



}


export const useCurrentNav = (path: string | Ref<string>) => {

    
    return useAsyncData(`the-nav-${unref(path)}`, async () => {
        const currentNav = getCurrentNav(unref(path));

        // console.log(currentNav);
        return currentNav;
        // await setTimeout(() => {
        //     console.log(1);
        // }, 1000);
        // return ({
        //     label: '명예교수회 소개',
        //     to: '/intro/neulbom',
        //     children: [
        //         {
        //             label: '명예교수회 소개',
        //             to: '/intro/neulbom',
        //         },
        //     ],
        // });
    }, {
        watch: [() => unref(path)]
    });



    return useAsyncData(`the-nav`, () => {

        const route = useRoute();
        const currentNav = getCurrentNav(route.path);

        return currentNav;
        // console.log(path);


        // if (is경로)
        //     path = `/${collection}` + path;

        // return queryCollection(collection).path(path).first()
    });

}