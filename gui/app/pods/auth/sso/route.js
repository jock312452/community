// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>.
//
// https://documize.com

import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
	session: service(),
	localStorage: service(),

	beforeModel() {
		this.get('localStorage').clearAll();
	},

	model({ token }) {
		this.get("session").authenticate('authenticator:documize', decodeURIComponent(token))
			.then(() => {
				this.transitionTo('folders');
			}, () => {
				this.transitionTo('auth.login');
			});
	},

	activate() {
		this.get('browser').setTitle('SSO');
	}
});
