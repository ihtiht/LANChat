import React from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet
} from 'react-native';
import moment from 'moment';
import Util from '../modules/util';

export default class MsgList extends React.Component {
	constructor(props) {
		super(props);
		this.renderMsg = this.renderMsg.bind(this);
	}

	renderMsg({ item }) {
		const isSelf = item.sender === Util.getUid();
		const type = item.type;
		return (
			<View style={ styles.msgContainer }>
				<View>
					<Text style={ !!isSelf ? styles.msgUsername_right : styles.msgUsername_left }>{ item.username }</Text>
				</View>
				<View style={!!isSelf ? styles.msgBubbleContainer_right : styles.msgBubbleContainer_left }>
					<View style={ !!isSelf ? styles.msgBubble_right : styles.msgBubble_left }>
						<Text style={ styles.msgBubbleText }>{ item[type] }</Text>
						<View style={ styles.timeWrapper }>
							<Text style={ styles.time }>{ moment(item.timestamp).format('HH:mm') }</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}

	render() {
		return (
			<FlatList
				style={{ marginBottom: 5 }}
				data={ this.props.messages }
				renderItem={ this.renderMsg }
			/>
		);
	}
}

const styles = StyleSheet.create({
	msgContainer: {
		margin: 10,
		marginBottom: 0
	},
	msgUsername_left: {
		color: '#666',
		marginBottom: 2,
		marginLeft: 5,
		fontSize: 16,
		fontWeight: 'bold'
	},
	msgUsername_right: {
		color: '#666',
		marginBottom: 2,
		marginRight: 5,
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'right'
	},
	msgBubbleContainer_left: {
		flexDirection: 'row'
	},
	msgBubbleContainer_right: {
		flexDirection: 'row',
		alignSelf: 'flex-end'
	},
	msgBubble_left: {
		borderRadius: 8,
		backgroundColor: '#F8F8F8',
		maxWidth: '85%',
		minWidth: 100,
		padding: 10
	},
	msgBubble_right: {
		borderRadius: 8,
		backgroundColor: '#B3B3A1',
		maxWidth: '85%',
		minWidth: 100,
		padding: 10,
	},
	msgBubbleText: {
		color: '#63676F'
	},
	timeWrapper: {
		marginTop: 1
	},
	time: {
		textAlign: 'right',
		color: '#666'
	}
});
