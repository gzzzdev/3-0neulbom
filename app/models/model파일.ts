import { reactive, type Reactive } from 'vue';
import type { iModel } from "./_";
import type { i파일DB, i파일, } from "../types";

import { API_BASE_URL } from '~/stores/_';



export class model파일 implements i파일, iModel<i파일DB, model파일> {

    state: Reactive<i파일DB>;
    _configid = { show: false }
    get id() { return this.state?.id ?? 'unknown' }
    set id(v: string) { this.state.id = v }

    _configlabel = { show: false }
    get label() { return this.name ?? 'unknown' }
    _configsub = { show: false }
    get sub() { return this.파일경로 ?? 'unknown' }


    get name() { return this.state.originalFileName ?? '' }
    set name(v: string) { this.state.originalFileName = v }

    // obj = {
    //     lastModified: 1755160521124,
    //     lastModifiedDate: "Thu Aug 14 2025 17:35:21 GMT+0900 (한국 표준시) {}",
    //     name: "2024년+늘봄학교+추진방안.pdf",
    //     size: 714595,
    //     type: "application/pdf",
    //     webkitRelativePath: ""
    // }


    get type() { return this.state.fileType ?? '' } //'application/pdf'
    set type(v: string) { this.state.fileType = v }

    get 저장파일명() { return this.state.storedFileName ?? '' }
    set 저장파일명(v: string) { this.state.storedFileName = v }
    get 파일경로() { return this.state.filePath ?? '' }
    set 파일경로(v: string) { this.state.filePath = v }

    get 파일크기() { return this.state.fileSize ?? 0 }
    set 파일크기(v: number) { this.state.fileSize = v }




    constructor(_?: Reactive<i파일DB>) {
        this.state = _ ?? reactive(this.do생성());//reactive(_ ?? this.do생성());
    }

    do생성 = (init = true): i파일DB => {
        if (init) {
            return {
                id: this.id ?? 'just_created',
                originalFileName: '',
                storedFileName: '',
                filePath: '',
                fileType: '',
                fileSize: 0,
                nUserId: 0,
                createdBy: '',
                updatedBy: '',
                createdAt: '',
                updatedAt: ''
            };
        }
        const _state = {
            id: this.id ?? 'just_created',
            originalFileName: '',
            storedFileName: '',
            filePath: '',
            fileType: '',
            fileSize: 0,
            nUserId: 0,
            createdBy: '',
            updatedBy: '',
            createdAt: '',
            updatedAt: ''
        };
        if (!init)
            Object.entries(_state).forEach(([key, value]) => this.state[key] = value);

        return _state;
    }


    do다운로드 = async () => {

        // useAlert().show(`${this.state.filePath} 다운로드 시작`);

        const downloadUrl = `${API_BASE_URL}/files/download/${this.state.id}`;



        // HEAD 요청으로 파일 존재 여부 확인
        try {
            const response = await $fetch(downloadUrl, { method: 'GET', credentials: 'include' });
            //이상없을때에만.
            window.location.href = downloadUrl;
            useAlert().show(`${this.label} 다운로드 완료`);
        }
        catch (e) {
            //500에러등. 
            console.error(e);
            useAlert().show(`${this.label} 다운로드 실패`);
        }



    }
    do새탭 = async () => {
        const downloadUrl = `${API_BASE_URL}/files/download/${this.state.id}`;


        // alert(downloadUrl);

        // HEAD 요청으로 파일 존재 여부 확인
        try {
            const blob = await $fetch(downloadUrl, { method: 'GET', credentials: 'include' });
            // console.log(response);
            const imageUrl = URL.createObjectURL(blob);

            // 2. 새 창/탭을 엽니다.
            const newWindow = window.open();

            // 3. 새 창/탭에 이미지 URL을 로드합니다.


            newWindow.location.href = imageUrl;

            // alert(response.blob());
            // const blob = await response.blob();


            // window.open('https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTJfMTk5%2FMDAxNjk3MTE3MDczMjYy.zKotxr8088iBxYLjGNsvYbu8KXivGBrIRAPAw2Wzficg.pa9t7UCsNxViW7mXEJVjw4T5GmC67u5P9mMOXBmh2bEg.PNG.ssupmike%2F%25BA%25B8%25C0%25CE%25B0%25ED%25B5%25EE%25C7%25D0%25B1%25B3_%25BF%25B5%25BE%25EE_1%25B5%25EE%25B1%25DE.png&type=a340', '_blank');
            // window.open(downloadUrl, '_blank');
            // //이상없을때에만.
            // window.location.href = downloadUrl;
            // useAlert().show(`${this.label} 다운로드 완료`);
        }
        catch (e) {
            //500에러등. 
            // console.error(e);
            useAlert().show(`${this.label} 새탭 열기 실패`);
        }

    }
    // download = () => this.do다운로드();


}
