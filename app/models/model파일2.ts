import { reactive, type Reactive } from 'vue';
import type { iModel } from "./_";
import type { i파일2DB, i파일2, } from "../types";

// import { API_BASE_URL } from '~/stores/_';



export class model파일2 implements i파일2, iModel<i파일2DB, model파일2> {

    state: Reactive<i파일2DB>;

    get file() { return this.state.file ?? '' }// formdata에서 넘기는 시점에서 파일명 등이 흐려짐. 여기서 따로 저장. 
    set file(v: File) { this.state.file = v }

    get label() { return this.state.file.name ?? '' }
    get sub() { return this.state.file.type ?? '' }

    // get 파일명() { return this.state.fileName ?? '' }
    // set 파일명(v: string) { this.state.fileName = v }
    // get 파일타입() { return this.state.fileType ?? '' }
    // set 파일타입(v: string) { this.state.fileType = v }

    constructor(_?: Reactive<i파일2DB>) {
        this.state = _ ?? reactive(this.do생성());//reactive(_ ?? this.do생성());
    }

    do생성 = (init = true): i파일2DB => {
        if (init) {
            return {
                id: 'just_created',
                nUserId: 0,
                file: undefined,
            };
        }
        const _state = {
            id: this.id ?? 'just_created',
            nUserId: 0,
            file: undefined,
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



}
