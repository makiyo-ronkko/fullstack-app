export interface ProfileInterface {
	user: string;
	intro: string;
	website: string;
	location: string;
	date: Date;
	profile?: {
		appuser: {
			avatar: string;
			name: string;
			_id: 'string';
		};
		_id: string;
		intro?: string;
		location?: string;
		website?: string;
	};
}

export interface AutehnticatedProfile {
	profile: ProfileInterface;
	loading: boolean;
	error: Object;
}
