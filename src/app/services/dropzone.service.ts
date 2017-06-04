import { Injectable } from '@angular/core';

@Injectable()
export class DropzoneService {

    body: HTMLElement;

    isDragEnter: Boolean = false;
    isDragLeave: Boolean = false;

    imageElement: HTMLImageElement;

    public init(element: HTMLElement, img: HTMLImageElement) {
        this.body = document.getElementsByTagName('body')[0];
        this.attachEventListeners(element);
        this.imageElement = img;

        this.imageElement.style.display = 'none';
    }

    public destroy(element: HTMLElement) {
        this.removeEventListeners(element);
    }

    private attachEventListeners(element: HTMLElement) {
        element.addEventListener('dragover', this.dragOver.bind(this), false);
        element.addEventListener('dragenter', this.dragEnter.bind(this), false);
        element.addEventListener('dragleave', this.dragLeave.bind(this), false);
        element.addEventListener('drop', this.drop.bind(this), false);
    }

    private removeEventListeners(element: HTMLElement) {
        element.removeEventListener('dragover', this.dragOver.bind(this), false);
        element.removeEventListener('dragenter', this.dragEnter.bind(this), false);
        element.removeEventListener('dragleave', this.dragLeave.bind(this), false);
        element.removeEventListener('drop', this.drop.bind(this), false);
    }

    private dragOver(e) {
        e.preventDefault();
        console.log('dragover', e);

    }

    private dragEnter(e) {
        e.preventDefault();
        console.log('dragstart', e);

        console.log(e.target);

    }

    private dragLeave(e) {
        e.preventDefault();
        console.log('dragexit', e);
    }

    private drop(e) {
        e.preventDefault();

        if (e.dataTransfer.files.length === 0) {
            return;
        }

        if (e.dataTransfer.files.length > 1) {
            return;
        }

        if (e.dataTransfer.files[0].type !== 'image/jpg'
            && e.dataTransfer.files[0].type !== 'image/png'
            && e.dataTransfer.files[0].type !== 'image/jpeg') {
                return;
        }

        if (e.dataTransfer.files[0].size > 10000000) {
            return;
        }

        const fr = new FileReader();

        fr.readAsDataURL(e.dataTransfer.files[0]);

        fr.onload = (ev: any) => {
            this.imageElement.src = ev.target.result;
        };

        this.imageElement.onload = (ev: any) => {
            this.imageElement.style.display = 'block';
        };
    }
}
