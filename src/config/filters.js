import Vue from 'vue'
import moment from 'moment'


Vue.filter('formatDate', function(input, format) {
	return moment(input).format(format);
});