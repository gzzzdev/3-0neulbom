class model테스트 {
    abc = 0;
    def = 0;
    count = ref();

    constructor() {
    }
    fromDB(_count: number) {
        this.count.value = _count;
        this.count.value += 100;
        return this
    }
    do1() {
        this.count.value += 1000;
    }
    save() {

    }
}
const use테스트 = defineStore('테스트', (): any => {

    // const list = reactive<iModel[]>([]);

    // const DB = useState('테스트DB', () => [1, 2, 3]);

    const _list = ref([]);
    const list = computed<model테스트[]>(() => _list.value.map((x: number) => new model테스트().fromDB(x)));

    const api_gets = async () =>
        new Promise(resolve => setTimeout(() => resolve([1, 2, 3]), 500));

    const fetch = async () => {

        
        
        let data = [];

        const DB = await useState('테스트DB', async () => await api_gets());
        console.log(DB.value);
        console.log('fetch');
        return;
        _list.value = DB.value;



    }
    return { list, fetch }
});
export { use테스트 };
