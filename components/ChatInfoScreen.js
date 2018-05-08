import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ChatInfoScreen extends React.Component {
	static navigationOptions = {
		title: '群組資訊'
	};

	render() {
		return (
			<KeyboardAwareScrollView>
				<View style={ styles.titleContainer }>
					<Text style={ styles.groupName }>{ this.props.navigation.state.params.groupName }</Text>
					<Text>[{ JSON.parse(this.props.navigation.state.params.groupInfo).net.ssid }]</Text>
				</View>
				<View style={ styles.descContainer }>
					<Text style={ styles.descTitle }>簡介</Text>
					<Text style={ styles.descText }>{ JSON.parse(this.props.navigation.state.params.groupInfo).groupDesc || '-' }</Text>
				</View>
			</KeyboardAwareScrollView>
		)
	}
}

const styles = StyleSheet.create({
	titleContainer: {
		backgroundColor: '#fff',
		paddingLeft: 55,
		paddingRight: 20,
		paddingTop: 30,
		paddingBottom: 30,
		borderColor: '#d3d3d3',
		borderTopWidth: 1,
		borderBottomWidth: 1
	},
	groupName: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	descContainer: {
		marginTop: 20
	},
	descTitle: {
		marginLeft: 10,
		fontSize: 16,
		color: '#6B7B83'
	},
	descText: {
		backgroundColor: '#fff',
		marginTop: 3,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 25,
		paddingBottom: 25,
		borderColor: '#d3d3d3'
	}
});