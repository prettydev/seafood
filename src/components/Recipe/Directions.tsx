import * as React from "react";
import * as _ from "lodash";
import renderHTML from "react-render-html";
export default class Directions extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      enabledDirections: {},
    };

    this.toggleIfCheckEnabled = this.toggleIfCheckEnabled.bind(this);
    this.generateDirectionElement = this.generateDirectionElement.bind(this);
  }

  toggleIfCheckEnabled(i, secI) {
    this.setState({
      enabledDirections: {
        ...this.state.enabledDirections,
        [i + "_" + secI]: {
          enabled: this.state.enabledDirections[i + "_" + secI]
            ? !this.state.enabledDirections[i + "_" + secI].enabled
            : true,
        },
      },
    });
  }

  generateDirectionElement(value, secI) {
    return _.map(value.directions, (v, i) => (
      <li
        key={v.id}
        onClick={(e) => this.toggleIfCheckEnabled(i, secI)}
        style={
          this.state.enabledDirections[i + "_" + secI]?.enabled
            ? { color: "#b3b3b3" }
            : {}
        }
      >
        <span>
          {this.state.enabledDirections[i + "_" + secI] &&
          this.state.enabledDirections[i + "_" + secI]?.enabled ? (
            <img
              src={require("../../assets/images/check-icon.svg")}
              alt=""
              style={{ width: "100%" }}
            />
          ) : (
            i + 1
          )}
        </span>
        {renderHTML(v.direction)}
      </li>
    ));
  }

  render() {
    return (
      <section
        className="direction-sec"
        style={{ backgroundColor: this.props.whiteBackground ? "#fff" : "" }}
      >
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="direction-inner">
                <div className="text-box">
                  <h3>DIRECTIONS</h3>
                  <ul>
                    {this.props.directions &&
                      this.props.directions.map((value, i) => (
                        <div key={"direction_" + i}>
                          <h4>{value.subItem}</h4>
                          {this.generateDirectionElement(value, i)}
                        </div>
                      ))}
                  </ul>
                </div>
                {this.props.note && (
                  <div className="text-inner">
                    <h3>Recipe notes</h3>
                    {renderHTML(this.props.note)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
