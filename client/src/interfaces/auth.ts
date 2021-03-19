import { UserInterface } from './user';

export interface Auth {
	token: string;
	authenticated: boolean;
	loading: boolean;
	user: UserInterface;
}
