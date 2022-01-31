export class FileItem {

    public archivo: File;
    public nombrearchivo: string;
    public url!: string;
    public estadoSubiendo: boolean;
    public pogreso: number;

    constructor(archivo: File){
        this.archivo = archivo;
        this.nombrearchivo = archivo.name;

        this.estadoSubiendo = false;
        this.pogreso = 0;

    }

}