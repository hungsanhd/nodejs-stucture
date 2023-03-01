export default class CreateSectionCVDto {
    constructor(
        name: string,
        email: string,
        gender: string,
        position: string,
        status: boolean
    ) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.position = position;
        this.status = status;
    }

    public name: string;
    public email: string;
    public gender: string;
    public position: string;
    public status: boolean;
}