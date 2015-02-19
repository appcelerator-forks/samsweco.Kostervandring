exports.definition = {
	config: {
		columns: {
		    "id": "integer",
		    "name": "text",
		    "infoTxt": "text",
		    "xkoord": "real",
		    "ykoord": "real"
		},
		adapter: {
			type: "sql",
			collection_name: "hotspotModel"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};