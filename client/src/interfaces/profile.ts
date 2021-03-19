export interface ProfileInterface {
	user: string;
	intro: string;
	website: string;
	location: string;
	date: Date;
}

export interface AutehnticatedProfile {
	profile: ProfileInterface;
	loading: boolean;
	error: Object;
}
