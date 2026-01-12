import { reactive, type Reactive } from 'vue';
import type { iModel } from "./_";
import type { i게시글DB, i게시글, i게시판ID } from "../types";

import { model파일2 } from "./model파일2";


import { i게시판IDoptions, i게시글타입options, type i게시글타입 } from "../types/type기타";

import { API_BASE_URL } from '~/stores/_';

import { m상태관리 } from "./m상태관리";

const is관리자 = computed(() => {
    const { user } = storeToRefs(useAuthStore());
    const hasAuth = user?.value?.role_names?.includes('관리자') || user?.value?.role_names?.includes('시스템루트');
    return hasAuth ?? false
});


export class model게시글 implements i게시글, iModel<i게시글DB, model게시글> {

    state: Reactive<i게시글DB>;
    stateUI = reactive({ 파일: undefined });

    _configid = { show: false }
    get id() { return this.state?.id ?? 'unknown' }
    set id(v: string) { this.state.id = v }

    _configlabel = { show: false }
    get label() { return this.제목 ?? 'unknown' }
    _configsub = { show: false }
    get sub() { return this.게시판 ?? 'unknown' }

    _config제목 = { icon: 'i-material-symbols-light-title-rounded' }
    get 제목() { return this.state.title ?? '' }
    set 제목(v: string) { this.state.title = v }
    _config날짜 = { icon: 'i-material-symbols-light-calendar-month-rounded' }
    // .toLocaleDateString()
    get 날짜() { return new Date(this.state.date) ?? '' }
    set 날짜(v: string) { this.state.date = v }


    get 이미지() { return this.state.thumbnail ?? 'https://cdn0.iconfinder.com/data/icons/one-line-2/1000/business___thought_idea_innovative_innovation_lightbulb_brainstorm_mind_people-1024.png' }
    set 이미지(v: string) { this.state.thumbnail = v }

    _config_게시판 = {
        type: 'select',
        // type: 'select',
        label: '게시판',
        options: i게시판IDoptions
    }
    get _게시판() { return this.state.boardType ?? 'edu' as i게시판ID }
    set _게시판(v: i게시판ID) { this.state.boardType = v }
    _config게시판 = { show: false }
    get 게시판() { return i게시판IDoptions.find(x => x.value == this._게시판)?.label ?? 'unknown' }


    _config카테고리 = { icon: 'i-fluent-tag-32-light' }
    get 카테고리() { return this.state.category ?? '' }
    set 카테고리(v: string) { this.state.category = v }



    // _config이미지 = {
    //     show: !false, type: 'image2', label: '이미지',
    //     ing: computed(() => this.stateUI.생성ing),
    //     // on생성: () => alert(123),
    //     on생성: () => this.do썸네일생성(this.제목),
    //     생성prompt: () => `${this.제목}(category:${this.영역})`
    // }
    _config타입 = {
        // show: !false, 

        label: '게시글 종류',
        options: i게시글타입options
    }
    get 타입() { return this.state.type ?? 'link' as i게시글타입 }
    set 타입(v: i게시글타입) {
        this.state.type = v;
    }


    _config연결된파일s = { show: false }// vue setup에서만 사용되어야함. 
    get 연결된파일s() {
        const list = use파일s().list.filter(x => x.state?.nUserId === this.id);
        return list;
    }

    _config파일 = {
        show: computed(() => this.타입 == 'download'),
        // show: !false, 
        type: 'file',
        label: '파일',
        icon: 'i-ph-file-light',
    }
    get 파일() {
        return undefined;
        // if (this.연결된파일s.length > 0 && this.stateUI.파일 == undefined) {
        //     this.stateUI.파일 = new File([new Blob([], { type: this.연결된파일s[0].type })], this.연결된파일s[0].name);
        //     this.stateUI.파일.download = this.연결된파일s[0].do다운로드;
        //     this.stateUI.파일.do새탭 = () => this.연결된파일s[0].do새탭();
        // }
        // return this.stateUI.증빙자료;// ?? this.연결된파일s[0].state;//?.state?.filePath ?? '';//.find(x => x.state.category == 'document') }//this.state.proof ?? '' }

    }
    set 파일(v: File) {
        useAlert().show('파일 업로드 기능 작업중입니다.');
        return;

        const { user } = storeToRefs(useAuthStore());
        const nUserId = user.value.nUser.id;
        // console.log(v);
        // const file = v;
        // const file = new File([v], v.name, { type: v.type });


        const model = new model파일2(
            reactive({
                id: 'just_created',
                // fileName: v.name,
                // fileType: v.type,
                nUserId: nUserId,
                file: v,
            })
        );



        import('~/stores/store파일2s').then(({ use파일2s }) => {
            use파일2s().upload(model)
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    // console.log(err);
                });
        });

        if (false)
            $fetch('/api/files2', {
                method: 'POST',
                body: { nUserId, file },
                credentials: 'include'
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });

        // const model = new model파일2();
        // model.state.file = v;
        // model.state.nUserId = nUserId;
        // import('~/stores/store파일2s').then(({ use파일2s }) => {
        //     use파일2s().add(model).then((res) => {
        //         console.log(res);
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // });


        // const formData = new FormData();
        // formData.append('nUserId', nUserId);
        // formData.append('file', v);


        return;
        // $fetch(`${API_BASE_URL}/files`, {
        //     method: 'POST',
        //     body: formData,
        //     credentials: 'include'
        // }).then((res) => {
        //     console.log(res);
        // })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    _config링크 = {
        show: computed(() => this.타입 == 'link'),
        type: 'inputBtn', label: '링크', icon: 'i-ph-link-simple-light'
    }
    get 링크() { return this.state.link ?? '' }
    set 링크(v: string) { this.state.link = v }

    do링크 = () => {
        // navigateTo(this.링크);
        window.open(this.링크, '_blank');
    }

    // get nUserId() { return this.state.nUserId ?? '' }
    // set nUserId(v: string) { this.state.nUserId = v }
    _config내용 = { show: false, icon: 'i-material-symbols-light-short-text-rounded' }
    get 내용() { return this.state.content ?? '' }
    set 내용(v: string) { this.state.content = v }

    // get 소개글() { return this.state.blobIntroduction ?? ' ' }
    // set 소개글(v: string) { this.state.blobIntroduction = v }






    상태관리 = new m상태관리();
    get is수정됨() { return this.상태관리.is수정됨 }
    constructor(_?: Reactive<i게시글DB>) {
        this.state = _ ?? reactive(this.do생성());//reactive(_ ?? this.do생성());
        this.상태관리._do상태감지(this.state);
    }

    do생성 = (init = true): i게시글DB => {
        if (init) {
            return {
                id: this.id ?? 'just_created',
                title: '',
                date: new Date(),
                nUserId: '',
                content: '',
                link: '',
                category: '',
                thumbnail: '',
                boardType: 'edu' as i게시판ID,
                createdAt: '',
                updatedAt: '',
                createdBy: '',
                updatedBy: ''
            };
        }
        const _state = {
            id: this.id ?? 'just_created',
            title: '게시글 제목',
            date: new Date(),
            nUserId: '1',
            content: '게시글 내용',
            thumbnail: 'https://picsum.photos/200/300',
            link: 'https://www.naver.com',
            description: '게시글 설명',
            category: '공지사항',
            boardType: 'edu' as i게시판ID
        };
        if (!init)
            Object.entries(_state).forEach(
                ([key, value]) => this.state[key] = value);
        // Object.entries(_state).forEach(([key, value]) => (this.state as any)[key] = value);
        return _state;
    }

    _configdo미리보기 = { show: is관리자, type: 'do', label: '미리보기', icon: 'i-material-symbols-light-preview-outline', color: 'primary' }
    do미리보기 = async () => {
        navigateTo(`/boards/${this.id}`);
        // useAlert().show(`${this.제목} 삭제되었습니다.`);

    }


    _configdo삭제 = { show: is관리자, type: 'do', label: '삭제', icon: 'i-ph-trash-simple-light', color: 'error' }
    do삭제 = async () => {

        if (confirm('정말 삭제하시겠습니까?')) {
            const { use게시글s } = await import('~/stores/store게시글s');
            await use게시글s().remove(this.id);
            this.state.is삭제 = true;
            useAlert().show(`${this.제목} 삭제되었습니다.`);

            return true;
        }
        else
            return false;


    }

    do저장 = async () => {
        const { use게시글s } = await import('~/stores/store게시글s');


        await use게시글s().update(this);
        useAlert().show('저장되었습니다.');
        return true;
    }


}
