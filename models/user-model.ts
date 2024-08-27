export interface UserModel {
    name: string;
    email: string;
    password: string;
};

export interface UserDetailsModel extends UserModel {
    id: number;
    created_at: Date;
};