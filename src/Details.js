import { Component } from "react";
import { withRouter } from "react-router";

class Details extends Component {
  constructor() {
    super();

    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json(); // data normalization
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }
  render() {
    const { animal, breed, city, state, description, name } = this.state;
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          {/* <h2>
            {animal} - {breed} - {city}, {state}
          </h2> */}
          <button>Adopt {name}</button>
          <p>{description}</p>
          <h2></h2>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
