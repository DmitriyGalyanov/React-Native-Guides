//@ts-nocheck
import { logger, consoleTransport } from 'react-native-logs';

export const log = logger.createLogger({
	severity: 'debug',
	transport: consoleTransport,
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
		returns: 4,
		app_inside_state: 5,
		webview_data_from_storage: 6,
		setters: 7,
		webViewScreen: 8,
		component_app_state: 9,
		component_game_state: 10,
		game_logs: 11,
		one_link: 12,
		fb_app_link: 13,
		use_deep_link_url_hook: 14,
		cut_and_replace: 15,
		open_at_install_url_setter: 16,
		gather_remote_data: 17,
		net_info: 18,
	},
	async: false, //true
	dateFormat: 'local',
	printLevel: true,
	printDate: true,
	enabled: true,
});
