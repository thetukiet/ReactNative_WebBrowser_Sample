import React, { useState } from 'react';
import { Config } from 'react-native-config';
import { styles } from './Home.styles';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  RefreshControl,
  useColorScheme,
  View,
  Keyboard,
  LogBox,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';

export function Home() {
  var webView = null;
  const defaultUrl = 'https://google.com';
  const [tempUrl, setTempUrl] = useState(defaultUrl);
  const [currentUrl, setUrl] = useState(defaultUrl);
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    webView.reload();
  };

  const onUrlSubmit = () => {
    // Hide the keyboard from the text-box
    Keyboard.dismiss();

    let url = tempUrl;
    if (url.trim() === '') {
      url = url.replace();
    }
    // Auto correct url
    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      url = 'http://' + url;
    }
    setUrl(url);
  };

  const handleNavigationStateChange = newNavState => {
    setLoading(false);
    //console.log(JSON.stringify(newNavState));
    const { url, title } = newNavState;
    if (title.toLowerCase() === 'webpage not available') {
      setTempUrl(defaultUrl);
      setUrl(defaultUrl);
      return;
    }
    if (url && url != 'about:blank') {
      setTempUrl(url);
      setUrl(url);
    }
  };

  const handleRenderError = error => {
    // Close Log notify message from WebView
    LogBox.ignoreAllLogs();
    setTempUrl(defaultUrl);
    setUrl(defaultUrl);
    Toast.show('Page may not existed. Redirect to default page', Toast.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.topSection}>
          <TextInput
            style={styles.addressBox}
            defaultValue={currentUrl}
            onChangeText={newUrl => setTempUrl(newUrl)}
          />
          <Button
            title="Go"
            style={styles.goButton}
            onPress={onUrlSubmit} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
          contentInsetAdjustmentBehavior="automatic">
          <WebView
            ref={ref => (webView = ref)}
            source={{ uri: currentUrl }}
            onNavigationStateChange={newNavState => handleNavigationStateChange(newNavState)}
            renderError={error => handleRenderError(error)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}