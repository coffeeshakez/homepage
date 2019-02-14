import React from 'react';
import WidgetSelector from "./WidgetSelector";
import Preview from "./Preview";
import Save from "./Save";
import {getWidgets, storeWidgetData, WIDGETS} from "../helpers/storage";
import '../styles/_generator.scss'
import PageHeader from "@ruter/rds-components/dist/es/UiShell/PageHeader/PageHeader";
import Logo from "@ruter/rds-components/dist/es/Logo/Logo";
import Form from "./Form";

class WidgetGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget: null,
            id: null,
            name: "bulletin",
            widgets: WIDGETS,
            savedWidgets: {}
        };
    }
    onWidgetSelected = (widget, id=null) => {
        console.info("CHANGE WIDGET", widget, id)
        const name = widget.fields.key;
        this.setState({widget, name, id})
    }
    onWidgetEdited = (widget) => {
        this.setState({widget: widget})
    }
    saveWidgetData = (widget, name) => {
        if(!this.state.id) {
            const id = storeWidgetData(widget, name).key;
            this.setState({id: id})
        } else {
            storeWidgetData(widget, name, this.state.id)
        }
    }
    componentDidMount() {
        this.onWidgetSelected(WIDGETS[this.state.name])
        getWidgets((savedWidgets) => this.setState({savedWidgets}))
    }
    render() {
        const widget = this.state.widget;
        return (
            <div className={"rw-fragment"}>
                <PageHeader skin="default">
                    <Logo color="white"/>
                </PageHeader>
                <main className="rw-body">
                    <WidgetSelector widgets={this.state.widgets} selected={this.state.name} onChange={this.onWidgetSelected}/>
                    {widget &&
                        <div className={"rw-fragment"}>
                            <Form widget={widget} onChange={this.onWidgetEdited}/>
                            <Preview widget={widget} onChange={this.onWidgetEdited}/>
                            <Save widget={widget} keyValue={this.state.name} id={this.state.id} save={this.saveWidgetData}/>
                        </div>
                    }
                    <h4>Saved modules</h4>
                    <WidgetSelector widgets={this.state.savedWidgets} selected={this.state.id} onChange={this.onWidgetSelected}/>
                </main>
            </div>
        )
    }
}
export default WidgetGenerator;