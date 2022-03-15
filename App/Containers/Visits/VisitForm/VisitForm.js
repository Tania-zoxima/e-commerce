import BlueButton from "App/Components/BlueButton";
import InputText from "App/Components/FormInput/InputText";
import GenericIcon from "App/Components/GenericIcon";
import ImagePicker from "App/Components/ImagePicker";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Select from "App/Components/Select";
import { SUBMIT } from "App/Constants";
import VisitsActions from "App/Stores/Visits/Actions";
import { CheckBox, Label, Radio } from "native-base";
import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
  Image,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import Style from "./VisitFormStyles";
import VisitInfoFormEntity from "./VisitInfoFormEntity";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import NavigationService from "App/Services/NavigationService";
import GenericDisplayCard from "App/Components/GenericDisplayCard";
import ProductActions from "App/Stores/Products/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import CommonActions from "App/Stores/Common/Actions";
import AddCompetitorFormEntity from "./AddCompetitorFormEntity";
import AddEntity from "./AddEntity";
import AddCompetitorEntity from "./AddCompetitorEntity";
import AttachmentDetail from "App/Components/AttachmentDetail";
import _ from "lodash";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";
import Ratings from "App/Components/Ratings";
import Dropdown from "../../../Components/DropDownComponent";
import DropDownPicker from "react-native-dropdown-picker";
import Uploadimage from "../../Leads/Uploadimage";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import CompetitorActions from "App/Stores/Competitor/Actions";
import AddBrandEntity from "./AddBrandEntity";
import SelectBrandEntity from "./SelectBrandEntity";
import IndicatorInputText from "../../../Components/FormInput/IndicatorInputText";
import ImageSlider from "../../../Components/Imageslide";

class VisitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeams: [],
      timer: null,
      disableafter: true,
      disablebefore: false,
      brands: [
        {
          brand: "",
          zx_percent: "",
          zx_value: "",
        },
      ],
      comps: [
        {
          competitor: "",
          retailerdrivingfactor: "",
        },
      ],
      infos: [
        {
          competitor: "",
          zx_percent: "",
          zx_valuepa: "",
          zx_distributorname: "",
          competitorbrandvisitinfo: [
            {
              brand: "",
              zx_percent: "",
              zx_valuepa: "",
              parent_id: "",
            },
          ],
        },
      ],
      add: [
        {
          brand: "",
          zx_percent: "",
          zx_valuepa: "",
          parent_id: "",
        },
      ],
    };
  }
  componentDidMount() {
    const { token, executeVisitData, visitInfoForm, user_details } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.fetchVisitInfo({
          token,
          visit_id: executeVisitData.zx_visitsid,
        }),
      800
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getCompetitorName({
          token,
        }),
      1000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getAllProductsBrands({
          token,
          zx_brandgroup: user_details.zx_brandgroup,
        }),
      2000
    );
  }

  // componentWillUnmount() {
  //   const { clearVisitInfo } = this.props

  //   clearVisitInfo()
  // }
  // const [shouldShow, setShouldShow] = useState(false);
  // const objectiveList = [
  //   { id: "Yes", name: "Yes" },
  //   { id: "No", name: "No" },
  // ];

  // const { selectedCustomer, changeCustomer } = props;

  getName() {
    const { name } = this.props;
    let Name = [];
    if (name && name.length) {
      name.map((obj) => {
        if ({ id: obj.zx_competitormasterid, name: obj.zx_recordid }) {
          Name.push({
            id: obj.zx_competitormasterid,
            name: obj.zx_recordid,
          });
        }
      });
    }
    return Name;
  }

  getbrand() {
    const { brands } = this.props;
    let brandname = [];
    if (brands && brands.length) {
      brands.map((obj) => {
        if ({ id: obj.zx_brandsid, name: obj.zx_brandcode }) {
          brandname.push({ id: obj.zx_brandsid, name: obj.zx_brandcode });
        }
      });
    }
    return brandname;
  }

  getNode() {
    const { form, removeForm, changeStockForm } = this.props;
    let brandsNode = [];

    if (form.length) {
      form.map((obj, index) => {
        brandsNode.push(
          <AddEntity
            form={obj}
            key={obj.id + index}
            removeForm={(params) => removeForm(params)}
            data={this.getName()}
            data1={[
              { id: "Price", name: "Price" },
              { id: "Schemes", name: "Schemes" },
              {
                id: "Brand Equity/Preferred Brand/Influencer Demand",
                name: "Brand Equity/Preferred Brand/Influencer Demand",
              },
              { id: "Credit period", name: "Credit period" },
              { id: "Branding activities", name: "Branding activities" },
              {
                id: "Availability/Services",
                name: "Availability/Services",
              },
              {
                id: "Relationship with the distributor",
                name: "Relationship with the distributor",
              },
              { id: "Profitability/Margin", name: "Profitability/Margin" },
              {
                id: "Secondary sale from the sales team",
                name: "Secondary sale from the sales team",
              },
              { id: "Product Range", name: "Product Range" },
              {
                id: "Transparency/Ease of Transactions",
                name: "Transparency/Ease of Transactions",
              },
            ]}
            changeForm={(params) => changeStockForm({ ...params, id: obj.id })}
          />
        );
      });
    }
    return brandsNode;
  }

  getNodeName() {
    const {
      distributorForm,
      visitInfoForm,
      form,
      selectBrand,
      removeForm,
      changeForm,
      changeUpdateStock,
    } = this.props;
    let brand = [];
    if (visitInfoForm && !_.isEmpty(visitInfoForm)) {
      visitInfoForm.competitorretailerdrivingfactor.map((obj1) => {
        brand.push(
          <AddEntity
            form={obj1}
            key={obj1.Id}
            removeForm={(params) => removeForm(params)}
            // data={this.getData()}
            data={this.getName()}
            data1={[
              { id: "Price", name: "Price" },
              { id: "Schemes", name: "Schemes" },
              {
                id: "Brand Equity/Preferred Brand/Influencer Demand",
                name: "Brand Equity/Preferred Brand/Influencer Demand",
              },
              { id: "Credit period", name: "Credit period" },
              { id: "Branding activities", name: "Branding activities" },
              {
                id: "Availability/Services",
                name: "Availability/Services",
              },
              {
                id: "Relationship with the distributor",
                name: "Relationship with the distributor",
              },
              { id: "Profitability/Margin", name: "Profitability/Margin" },
              {
                id: "Secondary sale from the sales team",
                name: "Secondary sale from the sales team",
              },
              { id: "Product Range", name: "Product Range" },
              {
                id: "Transparency/Ease of Transactions",
                name: "Transparency/Ease of Transactions",
              },
            ]}
            changeUpdateStock={(params) =>
              changeUpdateStock({ ...params, id: obj1.Id })
            }
          />
        );
      });
    }
    return brand;
  }

  getCompetitorNode() {
    const {
      formComp,
      removeFormComp,
      changeCompForm,
      ChangeNewCompetitorForm,
    } = this.props;

    let compNode = [];

    if (formComp.length) {
      formComp.map((obj, index) => {
        compNode.push(
          <AddCompetitorEntity
            formComp={obj}
            key={obj.id + index}
            removeFormComp={(params) => removeFormComp(params)}
            data={this.getName()}
            data1={this.getbrand()}
            changeForm={(params) => changeCompForm({ ...params, id: obj.id })}
            changeForm1={(params) =>
              ChangeNewCompetitorForm({ ...params, id: obj.id })
            }
          />
        );
      });
    }
    return compNode;
  }

  getCompetitorName() {
    const {
      distributorForm,
      visitInfoForm,
      formComp,
      selectBrand,
      removeFormComp,
      changeForm,
      changeUpdateCompForm,
      updateCompForm,
    } = this.props;
    let brand = [];
    if (updateCompForm && updateCompForm.length) {
      updateCompForm.map((obj1) => {
        brand.push(
          <AddCompetitorEntity
            formComp={obj1}
            key={obj1.Id}
            removeFormComp={(params) => removeFormComp(params)}
            // data={this.getData()}
            data={this.getName()}
            data1={this.getbrand()}
            changeUpdateCompForm={(params) =>
              changeUpdateCompForm({ ...params, id: obj1.Id })
            }
          />
        );
      });
    }
    return brand;
  }

  getData() {
    let data = [];
    if (this.state.selectedTeams.length) {
      this.state.selectedTeams.map((obj, index) => {
        data.push(obj.item);
      });
    }
    return data;
  }

  getAdd() {
    const { compFactor } = this.props;
    let arr = [];
    if (compFactor && compFactor.length) {
      compFactor.map((obj) => {
        if (obj.competitor) {
          // HelperService.removeField(obj, "id");
          arr.push(obj);
        }
      });
    }

    return arr;
  }
  getUpdatedAdd() {
    const { updateStockForm } = this.props;
    let arr = [];
    if (updateStockForm && !_.isEmpty(updateStockForm)) {
      arr.push(updateStockForm);
    }
    return arr;
  }

  getBrands() {
    const { brandInfo } = this.props;
    let formArr = _.cloneDeep(brandInfo);
    let arr = [];
    if (formArr && formArr.length) {
      formArr.map((obj) => {
        if (obj.brand) {
          // HelperService.removeField(obj, "id");
          arr.push(obj);
        }
      });
    }

    return arr;
  }

  getUpdatedBrands() {
    const { updateBrand } = this.props;
    let formArr = _.cloneDeep(updateBrand);
    let arr = [];
    if (formArr && !_.isEmpty(formArr)) {
      arr.push(formArr);
    }
    return arr;
  }

  getUpdatedComp() {
    const { updateCompForm, updateBrandForm, visitInfoForm } = this.props;
    let formArr = _.cloneDeep(updateCompForm);
    let arr = [];
    if (formArr && formArr.length) {
      formArr.map((p) => {
        // console.log("ppppppppppp", p);
        p.competitorbrandvisitinfo = updateBrandForm
          .filter((c) => c.parent === p.Id)
          .map((c) => ({
            brand: c.brand,
            zx_percent: c.zx_percent,
            zx_valuepa: c.zx_valuepa,
            Id: c.Id,
          }));
        HelperService.removeField(p, "zx_visitinfo");
        arr.push(p);
      });
    }
    // console.log("arrrr",arr)
    return arr;
  }

  // getComp() {
  //   const { updateCompForm, updateBrandForm } = this.props;
  //   let arr = [];
  //   if (updateCompForm && updateCompForm.length) {
  //     updateCompForm.map((p) => {
  //       if (p.competitor) {
  //         p.competitorbrandvisitinfo = updateBrandForm
  //           .filter((c) => c.zx_competitorvisitinfo === p.Id)
  //           .map((c) => ({
  //             brand: c.brand,
  //             zx_percent: c.zx_percent,
  //             zx_valuepa: c.zx_valuepa,
  //           }));

  //         // return p;

  //         HelperService.removeField(p, "id");
  //         arr.push(p);
  //       }
  //     });
  //   }

  //   return arr;
  // }

  getComp() {
    const { formBrand, formComp } = this.props;
    let formArr = _.cloneDeep(formComp);
    let arr = [];
    if (formArr && formArr.length) {
      formArr.map((p, index) => {
        if (p.competitor) {
          p.competitorbrandvisitinfo = formBrand
            .filter((c) => c.parent === p.id)
            .map((c) => ({
              brand: c.brand,
              zx_percent: c.zx_percent,
              zx_valuepa: c.zx_valuepa,
            }));

          // return p;

          HelperService.removeField(p, "id");
          arr.push(p);
        }
      });
    }

    // let merge = formComp.map(p => {
    //   p.competitorbrandvisitinfo = formBrand.filter(c => c.parent === p.id).map(c => ({zx_brand:c.zx_brand,zx_percent:c.zx_percent,zx_valuepa:c.zx_valuepa}));
    //   console.log("brannnndd",p)
    //   return p;
    //  });
    //  console.log("brannnnddzzzzz",merge)

    return arr;
  }

  // getUpdatedData() {
  //   const { updateCompForm } = this.props;
  //   let arr = [];
  //   if (updateCompForm && !_.isEmpty(updateCompForm)) {
  //     arr.push(stockform);
  //   }
  //   return arr;
  // }

  getBrandNode() {
    const { selectBrand, removeSelectForm, changeBrand } = this.props;
    let addBrandsNode = [];

    if (selectBrand.length) {
      selectBrand.map((obj, index) => {
        addBrandsNode.push(
          <SelectBrandEntity
            selectBrand={obj}
            key={obj.id + index}
            removeSelectForm={(params) => removeSelectForm(params)}
            //  data={this.getbrand()}
            changeForm={(params) => changeBrand({ ...params, id: obj.id })}
          />
        );
      });
    }

    return addBrandsNode;
  }

  // getRecord() {
  //   const { visitInfoForm } = this.props;
  //   let data = [];
  //   if (Object.keys(visitInfoForm).length) {
  //     visitInfoForm.zx_secondarysaletype.map((obj, index) => {
  //       data.push({ item: obj, id: obj });
  //     });
  //   }
  //   console.log("gggggggg", data);
  //   return data;
  // }

  onMultiChange() {
    return (item) =>
      this.setState({
        selectedTeams: xorBy(this.state.selectedTeams, [item], "id"),
      });
  }

  onChangeTextInput = (text) => {
    const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
    if (numericRegex.test(text)) {
      this.props.changeVisitInfoForm({
        edited_field: "zx_retailpercentagesale",
        edited_value: text,
      });
    }
  };

  getBrandName() {
    const {
      distributorForm,
      visitInfoForm,
      form,
      selectBrand,
      removeSelectForm,
      changeForm,
      changeUpdateBrand,
    } = this.props;
    let brand = [];
    if (visitInfoForm && !_.isEmpty(visitInfoForm)) {
      visitInfoForm.visitbrandinfo.map((obj1) => {
        brand.push(
          <SelectBrandEntity
            selectBrand={obj1}
            key={obj1.Id}
            removeSelectForm={(params) => removeSelectForm(params)}
            // data={this.getData()}
            changeUpdateBrand={(params) =>
              changeUpdateBrand({ ...params, id: obj1.Id })
            }
          />
        );
      });
    }
    return brand;
  }

  //   getAttachmentInfoNode() {
  //     let visibleNode = []
  //     let arr = []
  //     const { visitInfoFormLoader, visitInfoForm, executeVisitData, pg_id__c } = this.props

  //     if
  //       (visitInfoForm && !_.isEmpty(visitInfoForm)) {
  //     arr = visitInfoForm.zx_visitattachment.split()

  //     {
  //       visibleNode = (
  //         <ScrollView>
  //           {
  //             arr.map((obj, index) => (
  //               <View>
  //                 <View style={Style.box1}>
  //                   <GenericDisplayCardStrip
  //                     key={'Attachment' + index}
  //                     label={`Attachment ${index + 1} `}
  //                     labelStyle={{ ...Style.label, fontSize: wp('3.8%') }}
  //                     value={
  //                       <Text
  //                         style={{ textDecorationLine: 'underline', color: '#1890ff' }}
  //                         onPress={() => Linking.openURL(obj)}
  //                       >{`View`}</Text>
  //                     }
  //                   />
  //                 </View>
  //               </View>
  //             ))}
  //         </ScrollView>
  //       )}
  //     } else if (visitInfoFormLoader) {
  //       visibleNode = <Loading />
  //     } else {
  //       visibleNode = ""
  //     }
  // console.log("ancfddsadfg",visibleNode)
  //     return visibleNode
  //   }
  getImage() {
    const { visitInfoForm } = this.props;
    let globArr = [];
    let arr = visitInfoForm.zx_visitattachment;
    let answ = arr.split(",");
    answ.forEach(function(obj) {
      globArr.push(obj);
    });
    // console.log(globArr);
    return globArr;
  }

  addBrandHandler = () => {
    const _brands = [...this.state.brands];
    _brands.push({
      brand: "",
      zx_percent: "",
      zx_value: "",
    });
    this.setState({ brands: _brands });
    this.props.addBrandInfo(_brands);
  };

  inputBrandHandler = (text, key, param) => {
    const _brands = [...this.state.brands];
    if (param == "brand") {
      _brands[key].brand = text;
    }
    if (param == "zx_percent") {
      _brands[key].zx_percent = text;
    }
    if (param == "zx_value") {
      _brands[key].zx_value = text;
    }

    this.setState({ brands: _brands });
    this.props.addBrandInfo(_brands);
  };

  deleteBrandHandler = (key) => {
    const _brands = this.state.brands.filter((input, index) => index != key);
    this.setState({ brands: _brands });
    this.props.addBrandInfo(_brands);
  };

  addCompHandler = () => {
    const _comps = [...this.state.comps];
    _comps.push({
      competitor: "",
      retailerdrivingfactor: "",
    });
    this.setState({ comps: _comps });
    this.props.addCompFactor(_comps);
  };

  inputCompHandler = (text, key, param) => {
    const _comps = [...this.state.comps];
    if (param == "competitor") {
      _comps[key].competitor = text;
    }
    if (param == "retailerdrivingfactor") {
      _comps[key].retailerdrivingfactor = text;
    }

    this.setState({ comps: _comps });
    this.props.addCompFactor(_comps);
  };

  deleteCompHandler = (key) => {
    const _comps = this.state.comps.filter((input, index) => index != key);
    this.setState({ comps: _comps });
    this.props.addCompFactor(_comps);
  };

  addInfoHandler = () => {
    const _infos = [...this.state.infos];
    _infos.push({
      competitor: "",
      zx_percent: "",
      zx_valuepa: "",
      zx_distributorname: "",
      competitorbrandvisitinfo: [
        {
          brand: "",
          zx_percent: "",
          zx_valuepa: "",
          parent_id: "",
        },
      ],
    });
    this.setState({ infos: _infos });
    this.props.addCompInfo(_infos);
  };

  inputInfoHandler = (text, key, param) => {
    const _infos = [...this.state.infos];

    if (param == "competitor") {
      _infos[key].competitor = text;
    }
    if (param == "zx_percent") {
      _infos[key].zx_percent = text;
    }
    if (param == "zx_valuepa") {
      _infos[key].zx_valuepa = text;
    }
    if (param == "zx_distributorname") {
      _infos[key].zx_distributorname = text;
    }

    this.setState({ infos: _infos });

    this.props.addCompInfo(_infos);
  };

  deleteInfoHandler = (key) => {
    const _infos = this.state.infos.filter((input, index) => index != key);
    this.setState({ infos: _infos });
    this.props.addCompInfo(_infos);
  };

  addHandler = (parent) => {
    const _add = [...this.state.infos];
    _add[parent].competitorbrandvisitinfo.push({
      brand: "",
      zx_percent: "",
      zx_valuepa: "",
    });
    this.setState({ infos: _add });
    this.props.addCompInfo(_add);
  };

  inputHandler = (text, key, param, parent) => {
    const _add = [...this.state.infos];
    if (param == "brand") {
      _add[parent].competitorbrandvisitinfo[key].brand = text;
    }
    if (param == "zx_percent") {
      _add[parent].competitorbrandvisitinfo[key].zx_percent = text;
    }
    if (param == "zx_valuepa") {
      _add[parent].competitorbrandvisitinfo[key].zx_valuepa = text;
    }

    this.setState({ infos: _add });
    this.props.addCompInfo(_add);
  };

  deleteHandler = (key) => {
    const _add = this.state.infos.filter((input, index) => index != key);
    this.setState({ infos: _add });
    this.props.addCompInfo(_add);
  };

  render() {
    const {
      selectedCustomer,
      changeCustomer,
      addForm,
      token,
      addFormComp,
      visitInfoForm,
      executeVisitData,
      visitInfoMapping,
      uploadImageField,
      uploadImageLoader,
      uploadImage,
      removeSelectForm,
      changeBrand,
      selectBrand,
      selectBrandForm,
      visitsDisplayList,
      openModal,
      formComp,
      imageForm,
    } = this.props;

    let lastthree = [];
    let brands = [];
    let comp = [];
    let updateComp = [];
    let image = [];

    let forms = {
      zx_visit: executeVisitData.zx_visitsid,
      zx_customername: executeVisitData.zx_customer,
      zx_secondarysaletype: [],
      zx_dealeravailable: visitInfoForm.zx_dealeravailable,
      zx_hesellsanycompetitorscompanyProduct: visitInfoForm.zx_hesellsanycompetitorscompanyproduct
        ? visitInfoForm.zx_hesellsanycompetitorscompanyproduct
        : null,
      zx_areyougettingloyaltypointsprinceudaan: visitInfoForm.zx_areyougettingloyaltypointsprinceudaan
        ? visitInfoForm.zx_areyougettingloyaltypointsprinceudaan
        : null,
      zx_ifnowhyremarks: visitInfoForm.zx_ifnowhyremarks
        ? visitInfoForm.zx_ifnowhyremarks
        : "",
      zx_areyoutransferringloyaltypointsprinceudaa: visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa
        ? visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa
        : null,
      zx_ifnowhynotransferringloyaltypointsremarks: visitInfoForm.zx_ifnowhynotransferringloyaltypointsremarks
        ? visitInfoForm.zx_ifnowhynotransferringloyaltypointsremarks
        : "",
      zx_retailerdrivingfactors: visitInfoForm.zx_retailerdrivingfactors
        ? visitInfoForm.zx_retailerdrivingfactors
        : null,
      zx_visitinforemarks: visitInfoForm.zx_visitinforemarks,
      createdon: HelperService.dateReadableFormat3(),
      competitorRetailingFactor: lastthree.concat(this.getAdd()),

      zx_industrialpercentage: visitInfoForm.zx_industrialpercentage
        ? visitInfoForm.zx_industrialpercentage
        : null,
      zx_retailpercentagesale: visitInfoForm.zx_retailpercentagesale
        ? visitInfoForm.zx_retailpercentagesale
        : null,
      zx_projectpercentagesale: visitInfoForm.zx_projectpercentagesale
        ? visitInfoForm.zx_projectpercentagesale
        : null,
      zx_npdpercentagesale: visitInfoForm.zx_npdpercentagesale
        ? visitInfoForm.zx_npdpercentagesale
        : null,
      zx_industrialvaluepa: visitInfoForm.zx_industrialvaluepa
        ? visitInfoForm.zx_industrialvaluepa
        : null,
      zx_retailvaluepa: visitInfoForm.zx_retailvaluepa
        ? visitInfoForm.zx_retailvaluepa
        : null,
      zx_projectvaluepa: visitInfoForm.zx_projectvaluepa
        ? visitInfoForm.zx_projectvaluepa
        : null,
      zx_npdvaluepa: visitInfoForm.zx_npdvaluepa
        ? visitInfoForm.zx_npdvaluepa
        : null,
      competitorvisitinfo: comp.concat(this.getComp()),
      visitbrandinfo: brands.concat(this.getBrands()),
      zx_visitattachment: imageForm.zx_visitattachment
        ? imageForm.zx_visitattachment
        : null,
    };

    let form = {
      Id: visitInfoForm.Id,
      zx_visit: executeVisitData.zx_visitsid,
      zx_customername: executeVisitData.zx_customer,
      zx_secondarysaletype: visitInfoForm.zx_secondarysaletype,
      zx_dealeravailable: visitInfoForm.zx_dealeravailable
        ? visitInfoForm.zx_dealeravailable
        : null,
      zx_hesellsanycompetitorscompanyProduct: visitInfoForm.zx_hesellsanycompetitorscompanyproduct
        ? visitInfoForm.zx_hesellsanycompetitorscompanyproduct
        : null,
      zx_areyougettingloyaltypointsprinceudaan: visitInfoForm.zx_areyougettingloyaltypointsprinceudaan
        ? visitInfoForm.zx_areyougettingloyaltypointsprinceudaan
        : null,
      zx_ifnowhyremarks: visitInfoForm.zx_ifnowhyremarks
        ? visitInfoForm.zx_ifnowhyremarks
        : "",
      zx_areyoutransferringloyaltypointsprinceudaa: visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa
        ? visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa
        : null,
      zx_ifnowhynotransferringloyaltypointsremarks: visitInfoForm.zx_ifnowhynotransferringloyaltypointsremarks
        ? visitInfoForm.zx_ifnowhynotransferringloyaltypointsremarks
        : "",
      zx_retailerdrivingfactors: visitInfoForm.zx_retailerdrivingfactors
        ? visitInfoForm.zx_retailerdrivingfactors
        : null,
      zx_visitinforemarks: visitInfoForm.zx_visitinforemarks
        ? visitInfoForm.zx_visitinforemarks
        : null,
      createdon: HelperService.dateReadableFormat3(),
      competitorRetailingFactor: lastthree.concat(
        this.getUpdatedAdd(),
        this.getAdd()
      ),
      visitbrandinfo: brands.concat(this.getUpdatedBrands(), this.getBrands()),
      zx_industrialpercentage: visitInfoForm.zx_industrialpercentage
        ? visitInfoForm.zx_industrialpercentage
        : null,
      zx_retailpercentagesale: visitInfoForm.zx_retailpercentagesale
        ? visitInfoForm.zx_retailpercentagesale
        : null,
      zx_projectpercentagesale: visitInfoForm.zx_projectpercentagesale
        ? visitInfoForm.zx_projectpercentagesale
        : null,
      zx_npdpercentagesale: visitInfoForm.zx_npdpercentagesale
        ? visitInfoForm.zx_npdpercentagesale
        : null,
      zx_industrialvaluepa: visitInfoForm.zx_industrialvaluepa
        ? visitInfoForm.zx_industrialvaluepa
        : null,
      zx_retailvaluepa: visitInfoForm.zx_retailvaluepa
        ? visitInfoForm.zx_retailvaluepa
        : null,
      zx_projectvaluepa: visitInfoForm.zx_projectvaluepa
        ? visitInfoForm.zx_projectvaluepa
        : null,
      zx_npdvaluepa: visitInfoForm.zx_npdvaluepa
        ? visitInfoForm.zx_npdvaluepa
        : null,
      // competitorvisitinfo:comp.concat(this.getUpdatedComp(),this.getComp())
      // competitorvisitinfo:visitInfoForm.competitorvisitinfo
      competitorvisitinfo: updateComp.concat(
        this.getUpdatedComp(),
        this.getComp()
      ),
      zx_visitattachment:
        imageForm && !_.isEmpty(imageForm)
          ? image.concat(
              imageForm.zx_visitattachment,
              visitInfoForm.zx_visitattachment
            )
          : visitInfoForm.zx_visitattachment,
    };

    return (
      <ScrollView style={Style.container}>
        {visitInfoForm.Id ? (
          <TouchableOpacity
            style={{ left: wp("85%"), width: wp("8%"), top: hp("2%") }}
            onPress={() => {
              this.props.enabledForm();
            }}
            // onPress={() => {
            //   this.setState({ disableafter: false, disablebefore: true });
            // }}
          >
            <GenericIcon
              name={"create"}
              style={{ color: Colors.primary, fontSize: wp("8%") }}
            />
          </TouchableOpacity>
        ) : (
          []
        )}

        {executeVisitData.zx_countertype == null ? (
          []
        ) : (
          <View style={{ ...Style.dropDown }}>
            <Text style={{ ...Style.textStyle, marginBottom: "2%" }}>
              Counter Type*
            </Text>
            <Text
              style={{
                color: Colors.grey,
                fontWeight: "bold",
                fontSize: 13,
                marginTop: "8%",
              }}
            >
              {executeVisitData.zx_countertype}
            </Text>
          </View>
        )}

        <View style={Style.dropDown}>
          <Text style={Style.textStyle}>Dealer Available?*</Text>
          <View style={Style.radoiBtnOuter}>
            <View style={Style.radioBtnInner}>
              <Text style={Style.radioText}>Yes</Text>
              <Radio
                style={Style.radioBtn}
                onPress={() => {
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_dealeravailable",
                    edited_value: "Yes",
                  });
                }}
                selected={false}
                selected={visitInfoForm.zx_dealeravailable == "Yes"}
                // error={
                //   validation.invalid &&
                //   validation.invalid_field == "zx_constitutionofthefirm"
                // }
                selectedColor={Colors.radiobutton}
                color={Colors.radiobutton}
                disabled={visitInfoForm.Id ? this.props.showPicker : false}
              />
            </View>

            <View style={Style.radioBtnInner}>
              <Text style={Style.radioText}>No</Text>
              <Radio
                style={Style.radioBtn}
                onPress={() => {
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_dealeravailable",
                    edited_value: "No",
                  });
                }}
                selected={false}
                selected={visitInfoForm.zx_dealeravailable == "No"}
                selectedColor={Colors.radiobutton}
                color={Colors.radiobutton}
                disabled={visitInfoForm.Id ? this.props.showPicker : false}
              />
            </View>
          </View>
        </View>

        {/* {visitInfoForm.zx_dealeravailable == "Yes" ? (
          <View style={{ marginLeft: wp("6%"), marginTop: hp("2%") }}>
            {visitInfoForm.Id ? (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  marginBottom: hp("3%"),
                  flexWrap: "wrap",
                }}
              >
                <Text style={{ ...Style.textStyle, right: wp("9%") }}>
                  Secondary Sales Type:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    flexWrap: "wrap",
                    top: hp("4%"),
                    marginLeft: wp("16%"),
                    width: wp("60%"),
                  }}
                >
                  {visitInfoForm.zx_secondarysaletype.map((item) => {
                    return (
                      <View style={{ top: hp("2.5%"), right: wp("15%") }}>
                        <Text
                          style={{
                            color: Colors.grey,
                            fontWeight: "bold",
                            fontSize: 13,
                          }}
                        >
                          {item + "  "}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : (
              <SelectBox
                label="Secondary Sales Type"
                labelStyle={{
                  color: Colors.black,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
                width="85%"
                viewMargin="25px"
                containerStyle={{
                  elevation: 10,
                  // backgroundColor:"#F9F6EE",
                  borderRadius: 2,
                  justifyContent: "center",
                  padding: 10,
                  borderColor: "grey",
                }}
                options={[
                  {
                    item: "Retail",
                    id: "Retail",
                  },
                  {
                    item: "Project",
                    id: "Project",
                  },
                  {
                    item: "NPD",
                    id: "NPD",
                  },
                  {
                    item: "Industrial",
                    id: "Industrial",
                  },
                ]}
                selectedValues={
                  this.state.selectedTeams ? this.state.selectedTeams : []
                }
                onMultiSelect={this.onMultiChange()}
                onTapClose={this.onMultiChange()}
                listOptionProps={{ nestedScrollEnabled: true }}
                isMulti
              />
            )}
          </View>
        ) : (
          []
        )} */}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          <View
            style={{
              backgroundColor: "#C1E8E8",
              flexDirection: "column",
              //  justifyContent: "space-around",
              width: wp(90),
              // left: wp(5),
              // marginRight: wp(15),
              alignSelf: "center",

              // height: hp(8),
              marginTop: "8%",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.darkRedPink,
                height: hp("4%"),
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  width: wp("25%"),
                  textAlign: "left",
                  paddingLeft: wp("2.5%"),
                  textAlignVertical: "center",
                }}
              >
                Type
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  width: wp("30%"),
                  textAlign: "left",
                  paddingLeft: wp("2.5%"),
                  textAlignVertical: "center",
                }}
              >
                Percent(%)
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  width: wp("30%"),
                  textAlign: "left",
                  paddingLeft: wp("3.5%"),
                  textAlignVertical: "center",
                }}
              >
                Value(lacs)
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#C1E8E8",
                flexDirection: "row",
                justifyContent: "space-around",
                width: wp(85),
                // left: wp(5),
                height: hp(8),
                margin: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlignVertical: "center",
                  width: wp(18),
                  color: "black",
                }}
              >
                Retail
              </Text>
              <TextInput
                // style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
                style={{
                  height: hp("5%"),
                  backgroundColor: "white",
                  width: wp(25),
                  top: hp(1.5),
                  textAlign: "center",
                  // margin: 12,
                  padding: 8,
                }}
                placeholder="Enter %"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_retailpercentagesale)
                    : visitInfoForm.zx_retailpercentagesale
                }
                // onChangeText={this.onChangeTextInput}
                onChangeText={(value) => {
                  const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                  if (numericRegex.test(value)) {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_retailpercentagesale",
                      edited_value: value,
                    });
                  }
                }}
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(28),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                  left: wp("1.5%"),
                }}
                placeholder="Value(lacs)"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_retailvaluepa)
                    : visitInfoForm.zx_retailvaluepa
                }
                onChangeText={(value) =>
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_retailvaluepa",
                    edited_value: value,
                  })
                }
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
            </View>

            <View
              style={{
                backgroundColor: "#C1E8E8",
                flexDirection: "row",
                justifyContent: "space-around",
                width: wp(85),
                // left: wp(5),
                height: hp(8),
                margin: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlignVertical: "center",
                  width: wp(18),
                  color: "black",
                }}
              >
                Project
              </Text>
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(25),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                }}
                placeholder="Enter %"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_projectpercentagesale)
                    : visitInfoForm.zx_projectpercentagesale
                }
                onChangeText={(value) => {
                  const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                  if (numericRegex.test(value)) {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_projectpercentagesale",
                      edited_value: value,
                    });
                  }
                }}
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(28),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                  left: wp("1.5%"),
                }}
                placeholder="Value(lacs)"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_projectvaluepa)
                    : visitInfoForm.zx_projectvaluepa
                }
                onChangeText={(value) =>
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_projectvaluepa",
                    edited_value: value,
                  })
                }
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
            </View>

            <View
              style={{
                backgroundColor: "#C1E8E8",
                flexDirection: "row",
                justifyContent: "space-around",
                width: wp(85),
                // left: wp(5),
                height: hp(8),
                margin: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlignVertical: "center",
                  width: wp(18),
                  color: "black",
                }}
              >
                Industrial
              </Text>
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(25),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                }}
                placeholder="Enter %"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_industrialpercentage)
                    : visitInfoForm.zx_industrialpercentage
                }
                onChangeText={(value) => {
                  const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                  if (numericRegex.test(value)) {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_industrialpercentage",
                      edited_value: value,
                    });
                  }
                }}
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(28),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                  left: wp("1.5%"),
                }}
                placeholder="Value(lacs)"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_industrialvaluepa)
                    : visitInfoForm.zx_industrialvaluepa
                }
                onChangeText={(value) =>
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_industrialvaluepa",
                    edited_value: value,
                  })
                }
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
            </View>

            <View
              style={{
                backgroundColor: "#C1E8E8",
                flexDirection: "row",
                justifyContent: "space-around",
                width: wp(85),
                // left: wp(5),
                height: hp(8),
                margin: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlignVertical: "center",
                  width: wp(18),
                  color: "black",
                }}
              >
                NPD
              </Text>
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(25),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                }}
                placeholder="Enter %"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_npdpercentagesale)
                    : visitInfoForm.zx_npdpercentagesale
                }
                onChangeText={(value) => {
                  const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                  if (numericRegex.test(value)) {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_npdpercentagesale",
                      edited_value: value,
                    });
                  }
                }}
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
              <TextInput
                style={{
                  height: hp(5),
                  backgroundColor: "white",
                  width: wp(28),
                  top: hp(1.5),
                  textAlign: "center",
                  padding: 8,
                  left: wp("1.5%"),
                }}
                placeholder="Value(lacs)"
                value={
                  visitInfoForm.Id
                    ? String(visitInfoForm.zx_npdvaluepa)
                    : visitInfoForm.zx_npdvaluepa
                }
                onChangeText={(value) =>
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_npdvaluepa",
                    edited_value: value,
                  })
                }
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
            </View>
          </View>
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          <View
            style={{
              backgroundColor: "white",
              marginTop: hp("3%"),
              paddingBottom: hp("4%"),
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ ...Style.textsStyle, left: wp("10%") }}>
                Brand Visit Info
              </Text>
              <TouchableOpacity
                onPress={() => {
                  visitInfoForm.Id
                    ? this.props.dropPicker
                      ? this.addBrandHandler()
                      : []
                    : this.addBrandHandler();
                }}
                // onPress={() =>
                //   selectBrandForm({
                //     id: _.uniqueId(),
                //     brand: null,
                //     zx_percent: null,
                //     zx_value: null,
                //   })
                // }
              >
                <Image
                  style={Style.img}
                  source={require("App/Assets/Images/add.png")}
                />
              </TouchableOpacity>
            </View>
            {/* {addBrandsNode} */}
            {visitInfoForm.Id ? this.getBrandName() : []}

            {/* {this.getBrandNode()} */}
            {this.props.brandInfo.map((input, key) => (
              <View
                style={{
                  borderWidth: 2,
                  borderColor: Colors.lightPink,
                  elevation: 5,
                  width: wp("87%"),
                  marginLeft: wp("2%"),
                  marginBottom: "2%",
                  borderRadius: 10,
                  // height: hp("20%"),
                  marginTop: hp("2%"),
                  paddingBottom: hp("2%"),
                }}
              >
                <GenericIcon
                  name={"trash-can"}
                  show={true}
                  style={Style.trashButtonIcon}
                  onPress={() => this.deleteBrandHandler(key)}
                />
                <View style={{ height: hp("5%"), top: hp("5%") }}>
                  <SearchableDropdown
                    dataSource={this.getbrand()}
                    placeHolderText={"Select Brand"}
                    selectedValue={
                      input.brand
                      // updateBrand.brand &&
                      // updateBrand.Id == selectBrand.Id
                      //   ? updateBrand.brand
                      //   : selectBrand.brand}
                    }
                    onChange={
                      (text) => {
                        this.inputBrandHandler(text, key, "brand");
                      }

                      //   selectBrand.Id
                      //   ? this.props.changeUpdateBrand({
                      //     edited_field: "brand",
                      //     edited_value: value,
                      //     edited_field1: "Id",
                      //     edited_value1: selectBrand.Id,
                      //   })
                      //   : changeForm({
                      //   edited_field: "brand",
                      //   edited_value: value,
                      // })}
                    }
                    placeholder={"Select Brand"}
                    invalid={false}
                    customPickerStyles={{
                      width: "85%",
                      marginLeft: wp("15%"),
                      // marginTop: hp("5%"),
                      borderWidth: 1,
                      borderBottomColor: "lightgrey",
                      borderColor: Colors.lightPink,
                      backgroundColor: Colors.lightPink,
                    }}
                    labelStyles={{
                      color: Colors.black,
                      fontFamily: ApplicationStyles.textFont,
                      textAlign: "center",
                      //   width: "99%",
                      //  padding:5,
                      fontSize: 13,
                      flexDirection: "row",
                    }}
                    // key={selectBrand.brand + _.uniqueId()}
                    disablePicker={
                      visitInfoForm.Id ? this.props.showPicker : false
                    }
                    // invalid={
                    //   validation.invalid && validation.invalid_field == "area__c"
                    // }
                    //  label={"Existing customer?*"}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: hp("7%"),
                  }}
                >
                  <View
                    style={{
                      width: wp("30%"),
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 10,
                        fontWeight: "bold",
                        color: Colors.darkRedPink,
                      }}
                    >
                      Percent(%)
                    </Text>
                    <InputText
                      style={{
                        height: 40,

                        borderColor: "white",

                        width: wp("35%"),

                        backgroundColor: Colors.lightPink,
                        textAlign: "center",
                      }}
                      placeholder="Enter %"
                      value={
                        input.zx_percent
                        // updateBrand.zx_percent &&
                        // updateBrand.Id == selectBrand.Id
                        //   ? updateBrand.zx_percent
                        //   : selectBrand.zx_percent
                      }
                      onChange={
                        (value) => {
                          const numericRegex = /^[0-9]$|^[1-9][0-9]$|^(100)$|^$/;
                          if (numericRegex.test(value)) {
                            this.inputBrandHandler(value, key, "zx_percent");
                          }
                        }
                        //   selectBrand.Id
                        //   ? this.props.changeUpdateBrand({
                        //     edited_field: "zx_percent",
                        //     edited_value: value,
                        //     edited_field1: "Id",
                        //     edited_value1: selectBrand.Id,
                        //   })
                        //   : changeForm({
                        //   edited_field: "zx_percent",
                        //   edited_value: value,
                        // })}
                      }
                      editable={visitInfoForm.Id ? this.props.showInput : true}
                      // defaultValue={text}
                    />
                  </View>

                  <View
                    style={{
                      width: wp("30%"),

                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 10,
                        fontWeight: "bold",
                        color: Colors.darkRedPink,
                      }}
                    >
                      Value(lacs)
                    </Text>
                    <InputText
                      style={{
                        height: 40,
                        // borderWidth: 1,
                        borderColor: "white",
                        // marginTop: hp("2%"),
                        width: wp("38%"),
                        backgroundColor: Colors.lightPink,
                        textAlign: "center",
                      }}
                      placeholder="Value(lacs)"
                      textAlign="center"
                      value={
                        input.zx_value
                        // updateBrand.zx_value &&
                        // updateBrand.Id == selectBrand.Id
                        //   ? updateBrand.zx_value
                        //   : selectBrand.zx_value
                      }
                      onChange={
                        (value) => {
                          this.inputBrandHandler(value, key, "zx_value");
                        }

                        //   selectBrand.Id
                        //   ? this.props.changeUpdateBrand({
                        //     edited_field: "zx_value",
                        //     edited_value: value,
                        //     edited_field1: "Id",
                        //     edited_value1: selectBrand.Id,
                        //   })
                        //   : changeForm({
                        //   edited_field: "zx_value",
                        //   edited_value: value,
                        // })}
                      }
                      editable={visitInfoForm.Id ? this.props.showInput : true}
                      // defaultValue={text}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          <View style={Style.dropDown}>
            <Text style={Style.textStyle}>
              Does he sells any competitor's company Product?
            </Text>
            <View style={Style.radoiBtnOuter}>
              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>Yes</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_hesellsanycompetitorscompanyproduct",
                      edited_value: "Yes",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_hesellsanycompetitorscompanyproduct ==
                    "Yes"
                  }
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_constitutionofthefirm"
                  // }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                />
              </View>

              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>No</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_hesellsanycompetitorscompanyproduct",
                      edited_value: "No",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_hesellsanycompetitorscompanyproduct == "No"
                  }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                />
              </View>
            </View>
          </View>
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          visitInfoForm.zx_hesellsanycompetitorscompanyproduct == "Yes" ? (
            <View style={Style.dropDown}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={Style.textStyle}>Competitor Info</Text>
                <TouchableOpacity
                  onPress={() => {
                    visitInfoForm.Id
                      ? this.props.dropPicker
                        ? addFormComp({ id: _.uniqueId() })
                        : []
                      : addFormComp({ id: _.uniqueId() });
                  }}
                >
                  <Image
                    style={Style.img}
                    source={require("App/Assets/Images/add.png")}
                  />
                </TouchableOpacity>
              </View>
              {visitInfoForm.Id ? this.getCompetitorName() : []}

              {this.getCompetitorNode()}
            </View>
          ) : (
            []
          )
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          visitInfoForm.zx_hesellsanycompetitorscompanyproduct == "Yes" ? (
            <View style={Style.dropDown}>
              <Text style={Style.textStyle}>Driving Factors</Text>
              <View
                style={{
                  backgroundColor: Colors.lightPink,
                  marginTop: hp("5%"),
                  paddingBottom: hp("4%"),
                }}
              >
                <Text style={Style.textStyle1}>Prince Pipes</Text>
                <SearchableDropdown
                  dataSource={[
                    { id: "Price", name: "Price" },
                    { id: "Schemes", name: "Schemes" },
                    {
                      id: "Brand Equity/Preferred Brand/Influencer Demand",
                      name: "Brand Equity/Preferred Brand/Influencer Demand",
                    },
                    { id: "Credit period", name: "Credit period" },
                    { id: "Branding activities", name: "Branding activities" },
                    {
                      id: "Availability/Services",
                      name: "Availability/Services",
                    },
                    {
                      id: "Relationship with the distributor",
                      name: "Relationship with the distributor",
                    },
                    {
                      id: "Profitability/Margin",
                      name: "Profitability/Margin",
                    },
                    {
                      id: "Secondary sale from the sales team",
                      name: "Secondary sale from the sales team",
                    },
                    { id: "Product Range", name: "Product Range" },
                    {
                      id: "Transparency/Ease of Transactions",
                      name: "Transparency/Ease of Transactions",
                    },
                  ]}
                  placeHolderText={"Select Driving Factor"}
                  selectedValue={visitInfoForm.zx_retailerdrivingfactors}
                  onChange={(value) =>
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_retailerdrivingfactors",
                      edited_value: value,
                    })
                  }
                  placeholder={"Select Driving Factor"}
                  invalid={false}
                  customPickerStyles={{
                    width: "85%",
                    marginLeft: wp("16%"),
                    marginTop: 15,
                    borderWidth: 1,
                    borderBottomColor: "lightgrey",
                    borderColor: "white",
                    backgroundColor: "white",
                  }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  disablePicker={
                    visitInfoForm.Id ? this.props.showPicker : false
                  }
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={Style.textStyle1}>Competitor</Text>
                  <TouchableOpacity
                    onPress={() => {
                      visitInfoForm.Id
                        ? this.props.dropPicker
                          ? this.addCompHandler()
                          : []
                        : this.addCompHandler();
                    }}
                  >
                    <Image
                      style={Style.img}
                      source={require("App/Assets/Images/add.png")}
                    />
                  </TouchableOpacity>
                </View>
                {visitInfoForm.Id ? this.getNodeName() : []}

                {/* {this.getNode()} */}
                {this.props.compFactor.map((input, key) => (
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: Colors.white,
                      elevation: 5,
                      width: wp("75%"),
                      marginLeft: wp("2%"),
                      marginBottom: "2%",
                      borderRadius: 10,
                      height: hp("18%"),
                      marginTop: hp("2%"),
                      paddingBottom: hp("2%"),
                    }}
                  >
                    {/* {form.Id ? (
          []
        ) : ( */}
                    <View style={{ height: hp("1.5%") }}>
                      <GenericIcon
                        name={"trash-can"}
                        show={true}
                        style={Style.trashButtonIcon}
                        onPress={() => this.deleteCompHandler(key)}
                      />
                    </View>
                    {/* )} */}
                    <SearchableDropdown
                      dataSource={this.getName()}
                      placeHolderText={"Select Competitor"}
                      selectedValue={
                        input.competitor
                        // updateStockForm.competitor &&
                        // updateStockForm.Id == form.Id
                        //   ? updateStockForm.competitor
                        //   : form.competitor
                      }
                      onChange={
                        (text) => {
                          this.inputCompHandler(text, key, "competitor");
                        }

                        //   form.Id
                        //   ? this.props.changeUpdateStock({
                        //     edited_field: "competitor",
                        //     edited_value: value,
                        //     edited_field1: "Id",
                        //     edited_value1: form.Id,
                        //   })
                        //   : changeForm({
                        //   edited_field: "competitor",
                        //   edited_value: value,
                        // })}
                      }
                      placeholder={"Select Competitor"}
                      invalid={false}
                      customPickerStyles={{
                        width: "85%",
                        marginLeft: wp("16%"),
                        marginTop: 15,
                        borderWidth: 1,
                        borderBottomColor: "lightgrey",
                        borderColor: "white",
                        backgroundColor: "white",
                      }}
                      labelStyles={{
                        color: Colors.black,
                        fontFamily: ApplicationStyles.textFont,
                        textAlign: "center",
                        //   width: "99%",
                        //  padding:5,
                        fontSize: 13,
                        flexDirection: "row",
                      }}
                      disablePicker={
                        visitInfoForm.Id ? this.props.showPicker : false
                      }
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Existing customer?*"}
                    />
                    <SearchableDropdown
                      dataSource={[
                        { id: "Price", name: "Price" },
                        { id: "Schemes", name: "Schemes" },
                        {
                          id: "Brand Equity/Preferred Brand/Influencer Demand",
                          name:
                            "Brand Equity/Preferred Brand/Influencer Demand",
                        },
                        { id: "Credit period", name: "Credit period" },
                        {
                          id: "Branding activities",
                          name: "Branding activities",
                        },
                        {
                          id: "Availability/Services",
                          name: "Availability/Services",
                        },
                        {
                          id: "Relationship with the distributor",
                          name: "Relationship with the distributor",
                        },
                        {
                          id: "Profitability/Margin",
                          name: "Profitability/Margin",
                        },
                        {
                          id: "Secondary sale from the sales team",
                          name: "Secondary sale from the sales team",
                        },
                        { id: "Product Range", name: "Product Range" },
                        {
                          id: "Transparency/Ease of Transactions",
                          name: "Transparency/Ease of Transactions",
                        },
                      ]}
                      placeHolderText={"Select Driving Factor"}
                      selectedValue={
                        input.retailerdrivingfactor
                        // updateStockForm.retailerdrivingfactor &&
                        // updateStockForm.Id == form.Id
                        //   ? updateStockForm.retailerdrivingfactor
                        //   : form.retailerdrivingfactor
                      }
                      onChange={
                        (text) => {
                          this.inputCompHandler(
                            text,
                            key,
                            "retailerdrivingfactor"
                          );
                        }

                        //   form.Id
                        //   ? this.props.changeUpdateStock({
                        //     edited_field: "retailerdrivingfactor",
                        //     edited_value: value,
                        //     edited_field1: "Id",
                        //     edited_value1: form.Id,
                        //   })
                        //   : changeForm({
                        //   edited_field: "retailerdrivingfactor",
                        //   edited_value: value,
                        // })}
                      }
                      placeholder={"Select Driving Factor"}
                      invalid={false}
                      customPickerStyles={{
                        width: "85%",
                        marginLeft: wp("16%"),
                        marginTop: 15,
                        borderWidth: 1,
                        borderBottomColor: "lightgrey",
                        borderColor: "white",
                        backgroundColor: "white",
                      }}
                      labelStyles={{
                        color: Colors.black,
                        fontFamily: ApplicationStyles.textFont,
                        textAlign: "center",
                        //   width: "99%",
                        //  padding:5,
                        fontSize: 13,
                        flexDirection: "row",
                      }}
                      disablePicker={
                        visitInfoForm.Id ? this.props.showPicker : false
                      }
                      // invalid={
                      //   validation.invalid && validation.invalid_field == "area__c"
                      // }
                      //  label={"Existing customer?*"}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            []
          )
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          <View style={Style.dropDown}>
            <Text style={Style.textStyle}>
              Are you getting Loyalty Points (Prince UDAAN)?
            </Text>
            <View style={Style.radoiBtnOuter}>
              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>Yes</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_areyougettingloyaltypointsprinceudaan",
                      edited_value: "Yes",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_areyougettingloyaltypointsprinceudaan ==
                    "Yes"
                  }
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_constitutionofthefirm"
                  // }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                />
              </View>

              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>No</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_areyougettingloyaltypointsprinceudaan",
                      edited_value: "No",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_areyougettingloyaltypointsprinceudaan ==
                    "No"
                  }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                />
              </View>

              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>Not Applicable</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field: "zx_areyougettingloyaltypointsprinceudaan",
                      edited_value: "Not Applicable",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_areyougettingloyaltypointsprinceudaan ==
                    "Not Applicable"
                  }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                />
              </View>
            </View>
          </View>
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          visitInfoForm.zx_areyougettingloyaltypointsprinceudaan == "No" ? (
            <View style={Style.dropDown}>
              <Text style={{ ...Style.textStyle, bottom: "5%" }}>Remarks</Text>
              <IndicatorInputText
                style={{ marginTop: "10%" }}
                placeholder={"Enter Remarks!"}
                //  maxLength={0}
                value={visitInfoForm.zx_ifnowhyremarks}
                multiline={true}
                numberOfLines={1}
                onChange={(value) =>
                  this.props.changeVisitInfoForm({
                    edited_field: "zx_ifnowhyremarks",
                    edited_value: value,
                  })
                }
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
            </View>
          ) : (
            []
          )
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          <View style={Style.dropDown}>
            <Text style={Style.textStyle}>
              Are you transferring Loyalty Points (Prince UDAAN)?
            </Text>
            <View style={Style.radoiBtnOuter}>
              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>Yes</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field:
                        "zx_areyoutransferringloyaltypointsprinceudaa",
                      edited_value: "Yes",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa ==
                    "Yes"
                  }
                  // error={
                  //   validation.invalid &&
                  //   validation.invalid_field == "zx_constitutionofthefirm"
                  // }
                  selectedColor={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                  color={Colors.radiobutton}
                />
              </View>

              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>No</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field:
                        "zx_areyoutransferringloyaltypointsprinceudaa",
                      edited_value: "No",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa ==
                    "No"
                  }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                />
              </View>

              <View style={Style.radioBtnInner}>
                <Text style={Style.radioText}>Not Applicable</Text>
                <Radio
                  style={Style.radioBtn}
                  onPress={() => {
                    this.props.changeVisitInfoForm({
                      edited_field:
                        "zx_areyoutransferringloyaltypointsprinceudaa",
                      edited_value: "Not Applicable",
                    });
                  }}
                  selected={false}
                  selected={
                    visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa ==
                    "Not Applicable"
                  }
                  selectedColor={Colors.radiobutton}
                  color={Colors.radiobutton}
                  disabled={visitInfoForm.Id ? this.props.showPicker : false}
                />
              </View>
            </View>
          </View>
        ) : (
          []
        )}

        {visitInfoForm.zx_dealeravailable == "Yes" ? (
          visitInfoForm.zx_areyoutransferringloyaltypointsprinceudaa == "No" ? (
            <View style={Style.dropDown}>
              <Text style={Style.textStyle}>Remarks</Text>
              <IndicatorInputText
                style={{ marginTop: "10%" }}
                placeholder={"Enter Remarks!"}
                //  maxLength={0}
                value={
                  visitInfoForm.zx_ifnowhynotransferringloyaltypointsremarks
                }
                multiline={true}
                numberOfLines={1}
                onChange={(value) =>
                  this.props.changeVisitInfoForm({
                    edited_field:
                      "zx_ifnowhynotransferringloyaltypointsremarks",
                    edited_value: value,
                  })
                }
                editable={visitInfoForm.Id ? this.props.showInput : true}
              />
            </View>
          ) : (
            []
          )
        ) : (
          []
        )}
        <View style={Style.dropDown}>
          <Text style={Style.textStyle}> Visit Remarks*</Text>
          <IndicatorInputText
            style={{ marginTop: "10%" }}
            placeholder="Enter Visit Remarks!"
            //  maxLength={0}
            value={visitInfoForm.zx_visitinforemarks}
            multiline={true}
            numberOfLines={1}
            onChange={(value) =>
              this.props.changeVisitInfoForm({
                edited_field: "zx_visitinforemarks",
                edited_value: value,
              })
            }
            editable={visitInfoForm.Id ? this.props.showInput : true}
          />
        </View>

        {visitInfoForm.Id ? (
          this.props.showButton ? (
            <View
              style={{
                // display: "flex",
                // flexDirection: "column",

                marginTop: hp("2%"),
                // marginBottom: hp("0%"),
              }}
            >
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 20,
                  bottom: 10,
                }}
              >
                <GenericDisplayCardStrip
                  key={"Attachment:"}
                  label={"Attachment:"}
                  value={
                    <Text
                      style={
                        visitInfoForm.zx_visitattachment &&
                        visitInfoForm.zx_visitattachment.length
                          ? {
                              textDecorationLine: "underline",
                              color: "#1890ff",
                            }
                          : {}
                      }
                      onPress={() => {
                        return openModal({
                          content: (
                            <View style={{ flex: 1, alignSelf: "center" }}>
                              <ImageSlider
                                images={
                                  this.getImage()
                                  // visitInfoForm.zx_visitattachment == null
                                  //   ? []
                                  //   : visitInfoForm.zx_visitattachment.split(" ")
                                }
                              />
                            </View>
                          ),
                          heading: "Preview",
                          bodyFlexHeight: 0.7,
                        });
                      }}
                    >
                      {visitInfoForm.zx_visitattachment ? "View" : "No file"}
                    </Text>
                  }
                />
              </View>
              <View style={{ ...Style.bottomMargin }}>
                <MultipleImagePicker
                  title={"Take Pictue"}
                  images={imageForm.zx_visitattachment || []}
                  loading={
                    uploadImageLoader &&
                    uploadImageField == "zx_visitattachment"
                  }
                  onClearImage={(value) =>
                    this.props.changeImageForm({
                      edited_field: "zx_visitattachment",
                      edited_value: "",
                    })
                  }
                  onImageSuccess={({ images }) =>
                    uploadImage({
                      images,
                      params: { edited_field: "zx_visitattachment" },
                      multiple: true,
                      previous_value: imageForm.zx_visitattachment,
                    })
                  }
                >
                  <View style={Style.recurringActionButton1}>
                    <Text style={Style.recurringActionButtonText1}>
                      <GenericIcon
                        name="camera"
                        //show={true}
                        style={Style.recurringActionButtonIcon1}
                      />
                      {"Take Pictue"}
                    </Text>
                  </View>
                </MultipleImagePicker>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
                bottom: 10,
              }}
            >
              <GenericDisplayCardStrip
                key={"Attachment:"}
                label={"Attachment:"}
                value={
                  <Text
                    style={
                      visitInfoForm.zx_visitattachment &&
                      visitInfoForm.zx_visitattachment.length
                        ? { textDecorationLine: "underline", color: "#1890ff" }
                        : {}
                    }
                    onPress={() => {
                      return openModal({
                        content: (
                          <View style={{ flex: 1, alignSelf: "center" }}>
                            <ImageSlider
                              images={
                                this.getImage()
                                // visitInfoForm.zx_visitattachment == null
                                //   ? []
                                //   : visitInfoForm.zx_visitattachment.split(" ")
                              }
                            />
                          </View>
                        ),
                        heading: "Preview",
                        bodyFlexHeight: 0.7,
                      });
                    }}
                  >
                    {visitInfoForm.zx_visitattachment ? "View" : "No file"}
                  </Text>
                }
              />
            </View>
          )
        ) : (
          <View
            style={{
              // display: "flex",
              // flexDirection: "column",
              right: hp("10%"),
              marginTop: hp("2%"),
              // marginBottom: hp("0%"),
            }}
          >
            <View style={{ ...Style.bottomMargin, left: "15%" }}>
              <MultipleImagePicker
                title={"Take Pictue"}
                images={imageForm.zx_visitattachment || []}
                loading={
                  uploadImageLoader && uploadImageField == "zx_visitattachment"
                }
                onClearImage={(value) =>
                  this.props.changeImageForm({
                    edited_field: "zx_visitattachment",
                    edited_value: "",
                  })
                }
                onImageSuccess={({ images }) =>
                  uploadImage({
                    images,
                    params: { edited_field: "zx_visitattachment" },
                    multiple: true,
                    previous_value: imageForm.zx_visitattachment,
                  })
                }
              >
                <View style={Style.recurringActionButton1}>
                  <Text style={Style.recurringActionButtonText1}>
                    <GenericIcon
                      name="camera"
                      //show={true}
                      style={Style.recurringActionButtonIcon1}
                    />
                    {"Take Pictue"}
                  </Text>
                </View>
              </MultipleImagePicker>
            </View>
          </View>
        )}

        {visitInfoForm.Id && this.props.showButton ? (
          <View
            style={{
              width: "33%",
              height: "5%",
              alignSelf: "center",
              marginBottom: "5%",
              top: "2%",
            }}
          >
            <BlueButton
              style={Style.button}
              // rounded
              // large
              title={"UPDATE"}
              // disabled={loader}
              // loading={loader}
              onPress={() => {
                this.props.updateVisitInfo({ form: form, token });
                // this.setState({ disablebefore: false, disableafter: true });
              }}
            />
          </View>
        ) : (
          []
        )}

        {visitInfoForm.Id ? (
          []
        ) : (
          <View
            style={{
              width: "33%",
              height: "5%",
              alignSelf: "center",
              marginBottom: "5%",
              top: "2%",
            }}
          >
            <BlueButton
              style={Style.button}
              // rounded
              // large
              title={SUBMIT}
              // disabled={loader}
              // loading={loader}
              onPress={() => {
                this.props.createVisitInfo({ form: forms, token });
                // this.setState({ disablebefore: true });
              }}
            />
          </View>
        )}
        {this.props.loading == true ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 210,
              height: hp("5%"),
              width: "100%",
            }}
          >
            <Loading />
          </View>
        ) : null}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  form: state.visits.AddStockForm,
  formBrand: state.visits.AddBrandForm,
  formComp: state.visits.AddCompForm,
  loader: state.visits.addVisitInfoLoader,
  validation: state.visits.visitInfoFormValidation,
  visibilityLevelList: state.visits.visibilityLevelList,
  retailerCompetitors: state.retailers.retailerCompetitors,
  visitInfoFormMultiple: state.visits.visitInfoFormMultiple,
  productCategoryDisplayList: state.products.productCategoryDisplayList,
  competitorData: state.visits.visitCompetitor,
  competitorLoader: state.visits.getVisitCompetitorLoader,
  stockData: state.visits.visitStock,
  stockLoader: state.visits.getVisitStockLoader,
  Competitors: state.retailers.retailerCompetitors,
  productCategory: state.products.productCategoryDisplayList,
  uploadImageLoading: state.common.uploadImageLoader,
  uploadImageField: state.common.uploadImageField,
  pgid: state.visits.executeVisitData.pg_id__c,
  fetchVisitInfoLoader: state.visits.fetchVisitInfoLoader,
  visitInfoMapping: state.visits.visitInfoMapping,
  executeVisitData: state.visits.executeVisitData,
  user_details: state.user.user_details,
  visitInfoImage: state.visits.visitInfoImage,
  selectedCustomer: state.visits.visitInfo.selectedCustomer,
  visitInfoForm: state.visits.visitInfoForm,
  loading: state.visits.visitInfoFormLoader,
  name: state.competitor.competitorName,
  selectBrand: state.visits.SelectBrandForm,
  brands: state.products.BrandList && state.products.BrandList,
  updateBrand: state.visits.updateBrand,
  updateStockForm: state.visits.updateStockForm,
  updateCompForm: state.visits.updateCompForm,
  updateBrandForm: state.visits.updateBrandForm,
  visitsDisplayList: state.visits.visitsDisplayList,
  brandInfo: state.visits.brandInfo,
  compFactor: state.visits.compFactor,
  compInfo: state.visits.compInfo,
  compBrand: state.visits.compBrand,
  showPicker: state.visits.showPicker,
  showInput: state.visits.showInput,
  showButton: state.visits.showButton,
  dropPicker: state.visits.dropPicker,
  imageForm: state.visits.imageForm,
});

const mapDispatchToProps = (dispatch) => ({
  // changeForm: (params) => dispatch(VisitsActions.changeVisitInfoForm(params)),
  add: (params) => dispatch(VisitsActions.addVisitInfo(params)),
  fetchVisitImage: (params) => dispatch(VisitsActions.fetchVisitImage(params)),
  fetchAttachmentsData: (params) =>
    dispatch(VisitsActions.fetchVisitAttachmentsDetails(params)),
  addVisitInfoEntity: (params) =>
    dispatch(VisitsActions.addVisitInfoEntity(params)),
  removeVisitInfoEntity: (params) =>
    dispatch(VisitsActions.removeVisitInfoEntity(params)),
  editVisitInfoEntity: (params) =>
    dispatch(VisitsActions.editVisitInfoEntity(params)),
  getCompetitor: (params) => dispatch(VisitsActions.getCompetitor(params)),
  getStock: (params) => dispatch(VisitsActions.getStock(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  submitUpdateStockForm: (params) =>
    dispatch(VisitsActions.submitUpdateStockForm(params)),
  changeUpdateStockForm: (params) =>
    dispatch(VisitsActions.changeUpdateStockForm(params)),
  submitUpdateCompetitorForm: (params) =>
    dispatch(VisitsActions.submitUpdateCompetitorForm(params)),
  changeUpdateCompetitorForm: (params) =>
    dispatch(VisitsActions.changeUpdateCompetitorForm(params)),
  changeAddPlannedVisitsSearchFilters: (params) =>
    dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
  clearAddInfoForm: () => dispatch(VisitsActions.clearAddInfoForm()),
  fetchVisitInfo: (params) => dispatch(VisitsActions.fetchVisitInfo(params)),
  fetchProductCategories: (params) =>
    dispatch(ProductActions.fetchProductCategories(params)),
  changeCustomer: (params) => dispatch(VisitsActions.changeCustomer(params)),
  addForm: (params) => dispatch(VisitsActions.addStockForm(params)),
  removeForm: (params) => dispatch(VisitsActions.removeStockForm(params)),
  addFormBrand: (params) => dispatch(VisitsActions.addBrandForm(params)),
  removeFormBrand: (params) => dispatch(VisitsActions.removeBrandForm(params)),
  removeSelectForm: (params) =>
    dispatch(VisitsActions.removeSelectForm(params)),
  selectBrandForm: (params) => dispatch(VisitsActions.selectBrandForm(params)),

  addFormComp: (params) => dispatch(VisitsActions.addCompForm(params)),
  removeFormComp: (params) => dispatch(VisitsActions.removeCompForm(params)),
  changeVisitInfoForm: (params) =>
    dispatch(VisitsActions.changeVisitInfoForm(params)),
  createVisitInfo: (params) => dispatch(VisitsActions.createVisitInfo(params)),
  updateVisitInfo: (params) => dispatch(VisitsActions.updateVisitInfo(params)),
  getCompetitorName: (params) =>
    dispatch(CompetitorActions.getCompetitorName(params)),
  changeStockForm: (params) => dispatch(VisitsActions.changeStockForm(params)),
  getAllProductsBrands: (params) =>
    dispatch(ProductActions.getAllProductsBrands(params)),
  changeBrand: (params) => dispatch(VisitsActions.changeBrand(params)),
  changeCompForm: (params) => dispatch(VisitsActions.changeCompForm(params)),
  ChangeNewCompetitorForm: (params) =>
    dispatch(VisitsActions.ChangeNewCompetitorForm(params)),
  clearVisitInfo: () => dispatch(VisitsActions.clearVisitInfo()),
  changeUpdateCompForm: (params) =>
    dispatch(VisitsActions.changeUpdateCompForm(params)),
  changeUpdateBrand: (params) =>
    dispatch(VisitsActions.changeUpdateBrand(params)),
  changeUpdateStock: (params) =>
    dispatch(VisitsActions.changeUpdateStock(params)),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  closeModal: (params) => dispatch(CommonActions.closeModal(params)),
  addBrandInfo: (params) => dispatch(VisitsActions.addBrandInfo(params)),
  addCompFactor: (params) => dispatch(VisitsActions.addCompFactor(params)),
  addCompInfo: (params) => dispatch(VisitsActions.addCompInfo(params)),
  addCompBrand: (params) => dispatch(VisitsActions.addCompBrand(params)),
  enabledForm: (params) => dispatch(VisitsActions.enabledForm(params)),
  disabledForm: (params) => dispatch(VisitsActions.disabledForm(params)),
  changeImageForm: (params) => dispatch(VisitsActions.changeImageForm(params)),
  ClearForm: (params) => dispatch(VisitsActions.ClearForm(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitForm);
