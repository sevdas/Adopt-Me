import { Component } from "react";
import { withRouter } from "react-router";

class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    // debugger;
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id.slice(
        0,
        1
      )}`
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
    if (this.state.loading) {
      return <h2>Loading ...</h2>;
    }

    const { animal, breed, city, state, description, name } = this.state;
    console.log("animal", animal);
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
