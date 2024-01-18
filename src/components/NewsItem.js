import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let { title, descryption, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3 align-items-center justify-content-center">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://static.wikia.nocookie.net/gtawiki/images/f/f1/MeTV-GTA4-logo.png"
                : imageUrl
            }
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {descryption.length <= 100
                ? descryption
                : descryption.slice(0, 100)}
              ...
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
            <p className="card-text my-3">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
