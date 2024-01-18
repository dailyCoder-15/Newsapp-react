import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    pageSize: 9,
    country: "in",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); 
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
        };
        document.title = `MeTV-${this.capitalizeFirstLetter(this.props.category  )}`
  }

  async updateNews(pageNo) {
    
      this.props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?%20&country=${this.props.country}&category=${this.props.category}&apiKey=9d00409cf3c049aa90d833f5f669fe36&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      this.props.setProgress(40);
      const data = await fetch(url);
      const parsedData = await data.json();
      this.props.setProgress(100);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      })
      this.props.setProgress(100);
    
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevBtn = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextBtn = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">MeTV - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title != null ? element.title : ""}
                    descryption={
                      element.description != null ? element.description : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevBtn}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextBtn}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
