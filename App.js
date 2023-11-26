import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Animated } from 'react-native';

const App = () => {
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [slideAnim] = useState(new Animated.Value(-100));
	const markers = [
		{
			latlng: { latitude: 48.8868, longitude: 2.3602 },
			title: `Dustin and Laura's little library`,
			description: 'Tha motha fuckin best selection yo.',
		},
	];

	const handleMarkerPress = (marker) => {
		setSelectedMarker(marker);
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	const handleMarkerDeselect = () => {
		Animated.timing(slideAnim, {
			toValue: -200,
			duration: 500,
			useNativeDriver: false,
		}).start(() => {
			setSelectedMarker(null);
		});
	};

	const renderBottomView = () => {
		if (!selectedMarker) return null;

		return (
			<Animated.View style={[styles.bottomView, { bottom: slideAnim }]}>
				<Text style={{ fontSize: 18, paddingBottom: 5 }}>
					{selectedMarker.title}
				</Text>
				<Text style={{ fontSize: 12 }}>{selectedMarker.description}</Text>
			</Animated.View>
		);
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 48.8868,
					longitude: 2.3602,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						coordinate={marker.latlng}
						title={marker.title}
						onPress={() => handleMarkerPress(marker)}
						onDeselect={() => handleMarkerDeselect()}
					/>
				))}
			</MapView>
			{renderBottomView()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	bottomView: {
		position: 'absolute',
		width: '100%',
		padding: 20,
		height: 200,
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

export default App;
