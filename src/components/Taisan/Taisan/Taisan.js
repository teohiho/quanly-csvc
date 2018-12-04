import React, { Component } from 'react';
import './Taisan.css';
// import Table from './component/Table';
import Table1 from '../../../general/Table/Table'
// import App from './component/App/App'
import * as R from 'ramda';
import { Switch, Route } from 'react-router-dom'
import DieuChuyenTaiSan from '../DieuChuyenTaiSan/DieuChuyenTaiSan';
import ThanhLy from '../ThanhLy/ThanhLy';
import ThongKe from '../ThongKe/ThongKe';
import axios from 'axios';
import AddTS from './component/AddTS/AddTS';
import EditTS from './component/EditTS/EditTS';
import { QLCSVCContext, resource } from '../../SideBar/SideBar';
export const itemsTaisan = [];


class Taisan extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên tài sản' },
			{ id: 'dongia', numeric: false, disablePadding: false, label: 'Đơn giá' },
			{ id: 'soluong', numeric: false, disablePadding: true, label: 'Số lượng' },
			{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
			{ id: 'id_loaitaisan', numeric: false, disablePadding: false, label: 'Loại tài sản' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'id_user', numeric: false, disablePadding: false, label: 'Người nhập' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit'] },
		],
		selectApp : 'AddTS',
		loaitaisan: '',
		donvi:'',
		user:''
	}

	// componentDidMount(){
	// 	fetch('http://localhost:5500/taisan')
	// 	.then(res => res.json())
	// 	.then(json => {
	// 		var b =[]
	// 		{json.map(item => {
	// 			const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan, 'id_donvi':item.id_donvi, 'id_user': item.id_user};
	// 			b.push(a);
	// 		})}
	// 			this.setState({
	// 				itemsTaisan: json,
	// 				itemsTable: b
				
	// 			})
	// 	});
		
	// }

	handleGetListTable = (itemsTaisan) =>{
		var b =[]
		itemsTaisan.map(item => {
			const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan, 'id_donvi':item.id_donvi, 'id_user': item.id_user};
			b.push(a);
		})
		return b;
	}

	addTaiSan = (data) => {
		console.log('ADD TS', data)
	}
	// handleDelete(selected){
	// 	const data = this.state.itemsTable.filter(i => 
	// 		selected.filter(j => i.id === j)
	// 	)
	// 	this.setState({items : data})
	// }

	handleDelete = (selected) => {
		const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, this.state.itemsTable)
		// console.log("dataDeleted:",dataDeleted )
		this.setState({ itemsTable: dataDeleted, selected: [] })
		// console.log(">>><<<>>selected:",selected )
		
		// selected.forEach(function(select, i) {
		// 	// console.log("-------->select:::",select)
		// 	setTimeout(() => {
		// 		fetch('https://5bf551f82a6f080013a34e67.mockapi.io/api/taisan/'+ select, {
		// 		method: 'DELETE'
		// 	});
		// 	}, i*100)
		// });

		selected.forEach(function(select, i) {
			fetch('http://localhost:5500/taisan/'+ select, {
				method: 'DELETE'
			});
		});
    }

	render1 = () => {
		return (
			<QLCSVCContext.Consumer>
				{({ resource }) => {
					const data = this.handleGetListTable(resource.taisan);
					console.log("data:",data)
					return (
						<div>Taisan
							<Table1 
								rows={this.state.rows} 
								items={data} 
								handleDelete={this.handleDelete}  
								selectApp={this.state.selectApp}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}

	addTs = (name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status) => {
		axios.post(`http://localhost:5500/taisan`, { name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status})
		.then(res => {
			// console.log(res);
			// console.log(res.data);
		})
      
	}

	editTs = (id,name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status) => {
		axios.put(`http://localhost:5500/taisan/${id}`, {id, name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status})
		.then(res => {
			// console.log(res);
			// console.log(res.data);
		})
      
	}
	render() {
		// console.log(">> [TaiSan] itemsTaisan: ", this.state.itemsTaisan);
		return (
			<div>
				<Switch>
					<Route path="/taisan" exact render={this.render1}></Route>
					<Route exact path="/taisan/add" component={() => <AddTS addTs={this.addTs} />}></Route>
					<Route exact path="/taisan/Điều chuyển tài sản" render={() => <DieuChuyenTaiSan />} />
					<Route exact path="/taisan/Thanh lý" render={() => <ThanhLy />} />
					<Route exact path="/taisan/Thống kê" render={() => <ThongKe />} />
					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route>
				</Switch>
			</div>
		)
		
	}
}

export default Taisan;
