import React from 'react';
import {
	View,
	Text,
	Alert,
	StyleSheet
} from 'react-native';
import {
	Button,
	List,
	ListItem
} from 'react-native-elements';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GroupsTitle from './GroupsTitle.js';
import Storage from '../modules/Storage.js';
import util from '../modules/util.js';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			joinedGroups: '{}',
			currentNet: null
		};

		this.handleTabChange = this.handleTabChange.bind(this);
		this.checkPersonalInfo = this.checkPersonalInfo.bind(this);
		this.renderGroups = this.renderGroups.bind(this);
		this.handlePressGroup - this.handlePressGroup.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({
		title: '訊息',
		headerRight: (
			<Icon
				size={24}
				color="#37474F"
				name="pencil-square-o"
				style={ styles.newGroupBtn }
				onPress={ () => navigation.navigate('CreateGroup') }
			/>
		)
	});

	componentDidMount() {
		this.props.navigation.setParams({ handlePressNewGroup: this.handlePressNewGroup });
		this.props.navigation.addListener('didFocus', () => {
			this.checkPersonalInfo();
			this.renderGroups();
		});
	}

	handleTabChange(index) {
		switch (index) {
			case 0:
				this.props.navigation.navigate('Settings');
				break;
			case 2:
				this.props.navigation.navigate('QRScanner');
				break;
		}
	}

	async checkPersonalInfo() {
		const info = await Storage.getPersonalInfo();
		if (!info.normal.username) {
			Alert.alert('請先填寫個人資料', null, [{ text: 'OK', onPress: () => this.props.navigation.navigate('Settings') }]);
		}
	}

	async renderGroups() {
		const joinedGroups = await Storage.getJoinedGroups();
		const [ssid, bssid] = await util.getWifi();
		this.setState({
			joinedGroups: JSON.stringify(joinedGroups),
			currentNet: JSON.stringify({
				ssid,
				bssid
			})
		});
	}

	handlePressGroup(groupID) {
		alert(groupID);
	}

	render() {
		let joinedGroups = JSON.parse(this.state.joinedGroups);
		let currentNet = this.state.currentNet ? JSON.parse(this.state.currentNet) : null;
		return (
			<View style={ styles.container }>
				<List containerStyle={ styles.groupList }>
					<ListItem
						hideChevron
						title="LOBBY"
						subtitle="loading..."
						underlayColor="#d3d3d3"
						leftIcon={{ name: 'wifi-tethering'}}
						titleStyle={ styles.groupTitle }
						badge={{ value: 3, textStyle: { color: '#fff' }, containerStyle: { backgroundColor: '#ff3b30' } }}
						onPress={() => { this.handlePressGroup('LOBBY') }}
					/>
				</List>
				<KeyboardAwareScrollView style={{ marginBottom: 50}}>
					{ currentNet &&
						<View>
							<GroupsTitle ssid={ `連線中 :: ${currentNet.ssid}` } />
							<List containerStyle={styles.groupList}>
								{ joinedGroups[currentNet.bssid] && Object.keys(joinedGroups[currentNet.bssid]).map((groupID) => (
									<ListItem
										key={ groupID }
										hideChevron
										title={ joinedGroups[currentNet.bssid][groupID].groupName }
										subtitle="23:19  |  Y.y.: 安安你好..."
										underlayColor="#d3d3d3"
										titleStyle={styles.groupTitle}
										badge={{ value: 3, textStyle: { color: '#fff' }, containerStyle: { backgroundColor: '#ff3b30' } }}
										onPress={() => { this.handlePressGroup(groupID) }}
									/>
								)) }
							</List>
						</View>
					}

					{ Object.keys(joinedGroups).filter((bssid) => !currentNet || bssid !== currentNet.bssid).map((bssid) => {
						const ssid = Object.values(joinedGroups[bssid])[0].net.ssid;
						return (
							<View key={ bssid }>
								<GroupsTitle ssid={ ssid } />
								<List containerStyle={styles.groupList}>
									{ Object.keys(joinedGroups[bssid]).map((groupID) => (
										<ListItem
											key={ groupID }
											hideChevron
											title={ joinedGroups[bssid][groupID].groupName }
											subtitle="23:19  |  Y.y.: 安安你好..."
											underlayColor="#d3d3d3"
											titleStyle={styles.groupTitle}
											badge={{ value: 3, textStyle: { color: '#fff' }, containerStyle: { backgroundColor: '#ff3b30' } }}
											onPress={() => { this.handlePressGroup(groupID) }}
										/>
									)) }
								</List>
							</View>
						)
					}) }
				</KeyboardAwareScrollView>
				<BottomNavigation
					labelColor="white"
					rippleColor="white"
					activeTab={1}
					style={ styles.bottomNavigation }
					onTabChange={this.handleTabChange}
				>
					<Tab
						barBackgroundColor="#37474F"
						label="個人資訊"
						icon={<Icon size={24} color="white" name="user" />}
					/>
					<Tab
						barBackgroundColor="#37474F"
						label="訊息"
						icon={<MIcon size={24} color="white" name="message" />}
					/>
					<Tab
						barBackgroundColor="#37474F"
						label="加入群組"
						icon={<Icon size={24} color="white" name="qrcode" />}
					/>
				</BottomNavigation>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%'
	},
	bottomNavigation: {
		height: 50,
		elevation: 8,
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0
	},
	newGroupBtn: {
		marginRight: 10
	},
	groupList: {
		marginTop: 0,
		marginBottom: 0,
		borderTopWidth: 0
	},
	groupTitle: {
		fontWeight: 'bold'
	}
});
