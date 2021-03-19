import { Auth } from './auth';
import { AutehnticatedProfile } from './profile';

export interface State {
	auth: Auth;
	profile: AutehnticatedProfile;
	post: any;
}
