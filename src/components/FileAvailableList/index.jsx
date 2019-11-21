import { List, message, Avatar, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

import InfiniteScroll from 'react-infinite-scroller';

@connect(({ file }) => ({
  file,
}))
class FileAvailableList extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = callback => {
    const { dispatch } = this.props;
    dispatch({
      type: 'file/fetchAll',
      callback: data => {
        callback(data);
      },
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div className={styles['demo-infinite-container']}>
        <InfiniteScroll
          bounded
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className={styles['demo-loading-container']}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default FileAvailableList;
