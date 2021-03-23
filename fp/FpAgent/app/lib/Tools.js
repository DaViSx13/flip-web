Ext.define('FPAgent.lib.Tools', {
	statics: {
		client: function () {
			return window.location.hash.replace("#", "")
		}
	}
});
