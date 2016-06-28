'use strict';

const React = require('react')
const ReactNative = require('react-native')
var RefreshableInfiniteListView = require('./TestRefresh')
const {
  StyleSheet,
  RefreshControl,
  Text,
  View,
  ListView
} = ReactNative
var thisObj = null
var page = 0
var initData = ['data 0', 'data 1', 'data 2', 'data 3', 'data 4', 'data 5', 'data 6', 'data 7', 'data 8', 'data 9']
var rowData = initData
const styles = StyleSheet.create({
  listview: {
    flex: 1
  }
})

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
const RefreshExample = React.createClass({
  getInitialState () {
    thisObj = this
    return {
      dataSource: ds.cloneWithRows(rowData),
      isRefreshing: false,
      loadEnd: false,
      loading: false
    }
  },

  _genData () {
    page = page + 1
    var data = new Array()
    for (var i = 0; i < 10; i++) {
      data.push('data' + (page * 10 + i))
    }
    return data
  },

  _onInfinite () {
    if (!this.state.loading) {
      this.setState({loading: true})
      setTimeout(() => {
        console.log('page-------------', page)
        if (page === 3) {
          this.setState({loadEnd: true, loading: false})
        } else {
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          rowData = rowData.concat(thisObj._genData())
          this.setState({loading: false, dataSource: ds.cloneWithRows(rowData)})
        }
      }, 1000)
    }
  },
  _renderRow (data) {
    return (<View style={{alignSelf: 'center', justifyContent: 'center'}}><Text style={{height: 80}}>{data}</Text>
    </View>)
  },
  render () {
    return (
      <RefreshableInfiniteListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        onInfinite={this._onInfinite}
        renderRow={this._renderRow}
        onRefresh={this._onRefresh}
        loadEnd={this.state.loadEnd}
         />
    )
  },

  _onRefresh () {
    this.setState({isRefreshing: true})
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
        loadEnd: false,
        dataSource: ds.cloneWithRows(initData)
      })
      page = 0
      rowData = initData
    }, 1000)
  }
})
module.exports = RefreshExample