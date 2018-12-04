import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../../SideBar/SideBar';


const itemsTinhtrang = [
	{
		id: 0,
		name: 'Còn sử dụng',
	},
	{
		id: 1,
		name: 'Không còn sử dụng',
	}
];

class AddTS extends Component {
	state = {
		name: '',
		dongia: 0,
		soluong: 0,
		ngaynhap: '19/11/1997',
		hansudung: '23/7/2021',
		ghichu: '',
		id_loaitaisan: '',
		id_donvi: '',
		id_kinhphi: '',
		id_phong: '',
		id_user: '',
		status: 0,

	};

	componentDidMount() {
	}


	handleSubmit = (itemsTaisan, event, name, dongia, soluong, ngaynhap, hansudung, ghichu, id_loaitaisan, id_donvi, id_kinhphi, id_phong, id_user, status) => {
		event.preventDefault();
		// console.log("clicked submit");
		// var id = parseInt(itemsTaisan[itemsTaisan.length - 1].id) + 1;
		var dongia = parseInt(dongia);
		
		this.props.addTs(
			name,
			dongia,
			soluong,
			ngaynhap,
			hansudung,
			ghichu,
			id_loaitaisan,
			id_donvi,
			id_kinhphi,
			id_phong,
			id_user,
			status
		)
	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		console.log(">>loaitaisan: ", this.state.itemsLoaitaisan);
		const {
			name,
			dongia,
			soluong,
			ngaynhap,
			hansudung,
			ghichu,
			id_loaitaisan,
			id_donvi,
			id_kinhphi,
			id_phong,
			id_user,
			status,
		} = this.state;
		return (
			<QLCSVCContext.Consumer>
				{({ resource }) => {
					return (
						<div>
							{/* APP tài sản */}
							<form
								noValidate autoComplete="off"
							>
								<TextField
									id="standard-name"
									label="Tên tài sản"
									value={name}
									placeholder="Nhập tên tài sản"
									onChange={this.handleChange('name')}
									style={{ marginRight: 30 }}
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									id="standard-select-currency-native"
									select
									label="Tên người nhập"
									value={id_user}
									onChange={this.handleChange('id_user')}
									SelectProps={{
										native: true,
										MenuProps: {
										},
									}}
									InputLabelProps={{
										shrink: true,
									}}
									style={{ marginRight: 30 }}
									helperText="Please select your name"
									margin="normal"
								>
									{/* <option disabled="disabled" selected="true" value="">Chọn tên người nhập</option> */}
									{resource.user.map((item, i) => (
										<option key={i} value={item.id}>
											{item.fullname}
										</option>
									))}
								</TextField>
								<br />
								<TextField
									id="standard-name"
									label="Đơn giá"
									value={dongia}
									placeholder="Nhập đơn giá"
									style={{ marginRight: 30 }}
									// fullWidth
									helperText="số tiền!"
									onChange={this.handleChange('dongia')}
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									id="standard-name"
									label="Số lượng"
									value={soluong}
									style={{ marginRight: 30 }}
									type="number"
									placeholder="Nhập Số lượng"
									// fullWidth
									helperText="tổng số lượng!"
									onChange={this.handleChange('soluong')}
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									id="date"
									label="Ngày nhập"
									type="date"
									// defaultValue="1997-11-19"
									value={ngaynhap}
									onChange={this.handleChange('ngaynhap')}
									// fullWidth
									style={{ marginRight: 30 }}
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									id="date"
									label="Hạn sử dụng"
									type="date"
									// defaultValue="1997-11-19"
									value={hansudung}
									onChange={this.handleChange('hansudung')}
									// fullWidth
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<br />
								<TextField
									id="standard-name"
									label="Ghi chú"
									value={ghichu}
									placeholder="Nhập tên Ghi chú"
									onChange={this.handleChange('ghichu')}
									// fullWidth
									style={{ marginRight: 30 }}
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									id="standard-name"
									select
									label="Tình trạng"
									value={status}
									onChange={this.handleChange('status')}
									SelectProps={{
										native: true,
										MenuProps: {
										},
									}}
									helperText="Please select your currency"
									margin="normal"
								>
									{itemsTinhtrang.map((option, i) => (
										<option key={i} value={option.id}>
											{option.name}
										</option>
									))}
								</TextField>
								<br />

								<TextField
									id="standard-select-currency-native"
									select
									label="Lọai tài sản"
									value={id_loaitaisan}
									onChange={this.handleChange('id_loaitaisan')}
									SelectProps={{
										native: true,
										MenuProps: {
										},
									}}
									InputLabelProps={{
										shrink: true,
									}}
									style={{ marginRight: 30 }}
									helperText="Please select your currency"
									margin="normal"
								>
									{resource.loaitaisan.map((item, i) => {
										console.log("item:", item.id)
										return (
											<option key={i} value={item.id}>
												{item.name}
											</option>
										)
									})}
								</TextField>
								<TextField
									id="standard-select-currency-native"
									select
									label="Nguồn Kinh phí"
									value={id_kinhphi}
									onChange={this.handleChange('id_kinhphi')}
									SelectProps={{
										native: true,
										MenuProps: {
										},
									}}
									InputLabelProps={{
										shrink: true,
									}}
									style={{ marginRight: 30 }}
									helperText="Please select your currency"
									margin="normal"
								>
									{resource.nguonkinhphi.map((item, i) => (
										<option key={i} value={item.id}>
											{item.name}
										</option>
									))}
								</TextField>
								<TextField
									id="standard-name"
									select
									label="Đơn vị"
									value={id_donvi}
									onChange={this.handleChange('id_donvi')}
									SelectProps={{
										native: true,
										MenuProps: {
										},
									}}
									InputLabelProps={{
										shrink: true,
									}}
									style={{ marginRight: 30 }}
									helperText="Please select your currency"
									margin="normal"
								>
									{resource.donvi.map((item, i) => (
										<option key={i} value={item.id}>
											{item.name}
										</option>
									))}
								</TextField>
								<TextField
									id="standard-name"
									select
									label="Phòng"
									value={id_phong}
									onChange={this.handleChange('id_phong')}
									SelectProps={{
										native: true,
										MenuProps: {
										},
									}}
									InputLabelProps={{
										shrink: true,
									}}
									helperText="Please select your currency"
									margin="normal"
								>
									{resource.phong.map((item, i) => {
										// console.log("phòng: ", item.id)
										return (
											<option key={i} value={item.id}>
												{item.name}
											</option>
										)
									})}
								</TextField>
								<br />
								<Button variant="contained" color="primary"
									onClick={(event) => this.handleSubmit(
										resource.taisan,
										event,
										name,
										dongia,
										soluong,
										ngaynhap,
										hansudung,
										ghichu,
										id_loaitaisan,
										id_donvi,
										id_kinhphi,
										id_phong,
										id_user,
										status
									)}
								>
									Thêm
								</Button>
							</form>
						</div>)
				}}
			</QLCSVCContext.Consumer>
			);
	} //aaaa
}
	
	export default AddTS;
