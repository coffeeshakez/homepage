import React from 'react';
import Icon from "@ruter/rds-components/dist/es/Icon/Icon";
import {debounce} from 'throttle-debounce';
import {getDepartureInfo, isRegional, lineToEnturMode, lineToMode} from "../helpers/route";
import Logo from "@ruter/rds-components/dist/es/Logo/Logo";
import Puck from "@ruter/rds-components/dist/es/Puck/Puck";
import "../styles/_route.scss"
class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextDeparture: "...",
            duration: "...",
            mode: "",
            regionalClass: "",
            noLine: false,
            stop: "",
            tryDeparture: true
        };
    }
    componentWillMount() {
        this.updateStateFromFields(this.props.widget.fields, true)
        setInterval(() => {
         //   this.updateStateFromFields(this.props.widget.fields, false)
        }, 61000);
    }
    componentDidUpdate(prevProps) {
        const fields = prevProps.widget.fields;
        const mode = lineToMode(fields.line);
        const first = this.state.stop === "..."
        if (fields.stop !== this.state.stop || mode !== this.state.mode) {
            this.updateStateFromFields(fields, first);
        }
    }
    updateStateFromFields = (fields, first) => {
        const mode = lineToMode(fields.line);
        this.setState({
            mode: mode,
            stop: fields.stop,
            regionalClass: isRegional(fields.line) ? "-regional" : "",
            noLine: mode === "walk" || mode === "city-bike",
            tryDeparture: true,
        })
        if (first) {
            this.setNewDepartureTime(fields)
        } else {
            this.throttledDeparture(fields)
        }
    }
    throttledDeparture = debounce(1000, false, (fields) => this.setNewDepartureTime(fields));
    setNewDepartureTime = fields => {
        let mode = lineToEnturMode(fields.line)
        if (!fields.stop || !mode || !this.state.tryDeparture) return;
        getDepartureInfo(fields.stop, mode, fields.line)
            .then(([frequency, tripDuration]) => {
                const [prettyFrequency, duration] = prettyDates(frequency, tripDuration)
                this.setState({nextDeparture: prettyFrequency, duration, tryDeparture: !!tripDuration})
            })
    }
    render() {
        const fields = this.props.widget.fields;
        const {regionalClass, noLine, mode} = this.state
        const isNor = fields.lang !== "eng";
        const Header = () => (fields.title) ? <div className={"rw-route__header"}>{fields.title}</div> : null
        const Transport = () =>
            <span className={"rw-route__transport rw-route__transport--" + mode + regionalClass}>
                <div className="rw-route__transport__top">
                     {!noLine && <span>{fields.line}</span>}
                    <Icon name={mode} size={"large"}/>
                </div>
                {fields.towards && !noLine && <div className="rw-route__transport__towards">{fields.towards}</div>}
             </span>
        const From = () => fields.start ?
            <div className={"rw-route__from"}>
                <span className={"rw-route__from__text"}>{fields.start}</span>
                <Platform/>
            </div> :null
        const Stop = () => fields.stop ? <div className={"rw-route__stop"}>{fields.stop}</div> : null
        const Platform = fields.platform ? () => {
            const split = fields.platform.split(" ")
            return <span className={"rw-route__platform"}>{split[0]} {split.length > 1 && <Puck text={split[1]}/>}</span>
            } : () => null
        const TravelTime = () => this.state.duration && fields.stop ?
            <div className={"rw-route__traveltime"}>
                {isNor ? "Tar" : "Takes"} <span className="rw-semibold">{this.state.duration}</span>
            </div> : null
        const Next = () => fields.line && fields.stop && this.state.nextDeparture ?
            <div className={"rw-route__next"}>
                {isNor ? "Hvert" : "Departs every"} <span className="rw-semibold">{this.state.nextDeparture}</span>
            </div> : null
        const Line = () => fields.start ? <div className={"rw-route__line"}><i className={"top"}/> <i className={"bottom"}/></div> : null
        const Footer = () =>
            <div className={"rw-route__footer"}>
                <span className={"rw-route__footer__icons"}>
                    <Icon name="metro"/> <Icon name="tram"/> <Icon name="bus"/> <Icon name="train"/> <Icon name="boat"/>
                </span>
                <Logo className={"rw-route__footer__logo"} color="white" title={"Logo"} />
            </div>
        return (
            <div className="rw-route">
                <div className={"rw-route__body"}>
                    <Header/>
                    <div className={"rw-route__info"}>
                        <div className={"rw-route__info__left"}>
                            <Transport/>
                            <TravelTime/>
                            <Next/>
                        </div>
                        <div className={"rw-route__info__center"}>
                            <Line/>
                        </div>
                        <div className={"rw-route__info__right"}>
                            <From/>
                            <Stop/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
const prettyDates = (frequency, duration) => {
    if (!frequency || !duration)
        return [null, null]
    const postfix = " min"
    const minutes = Math.ceil(frequency / 60000);
    console.log(frequency, minutes)
    let outDate = ""
    if (minutes < 60) {
        outDate = minutes + "." + postfix
    }
    let outDuration = duration + postfix;
    if (duration >= 60) {
        outDuration = Math.floor(duration / 60) + "t " + (duration % 60) + "min"
    }
    return [outDate, outDuration]
}
export default Route;