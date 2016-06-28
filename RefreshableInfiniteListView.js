'use strict';

const React = require('react')
const ReactNative = require('react-native')
const {
  StyleSheet,
  RefreshControl,
  Text,
  View,
  ListView
} = ReactNative
const styles = StyleSheet.create({
  listview: {
    flex: 1
  }
})
var footerText = ''
const RefreshableInfiniteListView = React.createClass({
  getInitialState () {
    return {
      dataSource: this.props.dataSource,
      isRefreshing: false,
      loadEnd: this.props.loadEnd,
      loading: false
    }
  },
  componentDidMount () {
    this.setState({isRefreshing: true})
    this.props.onRefresh()
    this.setState({isRefreshing: false})
  },
  _renderFooter () {
    if (this.props.loadEnd) {
      footerText = 'no more data'
    } else {
      footerText = 'loading more'
    }
    return (<View style={{alignSelf: 'center'}}><Text style={{height: 80}}>{footerText}</Text></View>)
  },
  _onEndReached () {
    console.log('_onEndReached', this.state.loading, this.state.loadEnd, this.props.loadEnd)
    if (!this.state.loading) {
      this.setState({loading: true})
      this.props.onInfinite()
      console.log('this.props.onInfinite()', this.state.loading, this.state.loadEnd, this.props.loadEnd)
      this.setState({loading: false})
    }
  },
  render () {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.props.dataSource}
        onEndReached={this._onEndReached}
        renderRow={this.props.renderRow}
        onEndReachedThreshold={20}
        renderFooter={this._renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.props.onRefresh}
            title='Loading...'
          />
        } />
    )
  }
})
module.exports = RefreshableInfiniteListView