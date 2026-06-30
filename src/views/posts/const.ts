// Trạng thái dùng chung
export const PROJECT_STATUS = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const

export const TYPE_ROOM = {
  RegularRoom: 1, // Phòng trọ thường: diện tích nhỏ (10–20m²), có thể chung hoặc riêng nhà vệ sinh.
  EnSuiteRoom: 2, // Phòng trọ khép kín: có nhà vệ sinh, bếp trong phòng, phù hợp gia đình nhỏ hoặc cặp đôi.
  RoomWithAttic: 3, // Phòng trọ có gác: tận dụng không gian, giá vừa phải, sinh viên hay thuê.
  DormitoryRoom: 4, // Phòng ký túc xá (dorm): giường tầng, ở ghép, giá rẻ nhất, thường cho sinh viên hoặc công nhân.
  MiniApartment: 5, // Chung cư mini: dạng căn hộ nhỏ, đầy đủ tiện nghi, có thể 1PN hoặc 2PN.
  HouseForRent: 6, // Nhà nguyên căn cho thuê: phù hợp nhóm bạn, hộ gia đình, hoặc người thuê lâu dài.
  HomeStay: 7, // Căn hộ cho thuê
  Kiot: 8, // Kiot cho thuê
} as const

export const TYPE_ROOM_OPTIONS = [
  { label: 'Phòng trọ thường', value: TYPE_ROOM.RegularRoom },
  { label: 'Phòng trọ khép kín', value: TYPE_ROOM.EnSuiteRoom },
  { label: 'Phòng trọ có gác', value: TYPE_ROOM.RoomWithAttic },
  { label: 'Phòng ký túc xá (dorm)', value: TYPE_ROOM.DormitoryRoom },
  { label: 'Chung cư mini', value: TYPE_ROOM.MiniApartment },
  { label: 'Nhà nguyên căn cho thuê', value: TYPE_ROOM.HouseForRent },
  { label: 'Căn hộ', value: TYPE_ROOM.HomeStay },
  { label: 'Kiot', value: TYPE_ROOM.Kiot },
]

export const DIRECTION_ROOM = {
  East: 1, // Hướng Đông
  West: 2, // Hướng Tây
  South: 3, // Hướng Nam
  North: 4, // Hướng Bắc
  Southeast: 5, // Hướng Đông Nam
  Southwest: 6, // Hướng Tây Nam
  Northeast: 7, // Hướng Đông Bắc
  Northwest: 8, // Hướng Tây Bắc
} as const

export const DIRECTION_ROOM_OPTIONS = [
  { label: 'Hướng Đông', value: DIRECTION_ROOM.East },
  { label: 'Hướng Tây', value: DIRECTION_ROOM.West },
  { label: 'Hướng Nam', value: DIRECTION_ROOM.South },
  { label: 'Hướng Bắc', value: DIRECTION_ROOM.North },
  { label: 'Hướng Đông Nam', value: DIRECTION_ROOM.Southeast },
  { label: 'Hướng Tây Nam', value: DIRECTION_ROOM.Southwest },
  { label: 'Hướng Đông Bắc', value: DIRECTION_ROOM.Northeast },
  { label: 'Hướng Tây Bắc', value: DIRECTION_ROOM.Northwest },
]

export const FACILITY_ROOM = {
  NearMarket: 1, // Gần chợ
  NearSchool: 2, /// Gần trường học
  NearHospital: 3, // Gần bệnh viện
  NearBusStation: 4, // Gần bến xe/bus
  NearIndustrialPark: 5, // Gần khu công nghiệp
  NearResidentialArea: 6, // Khu dân cư an ninh
  NearPeopleCommittee: 7, // Gần ủy ban nhân dân
  NearGasStation: 8, // Gần trạm xăng
  NearGreenGrocery: 9, // Gần bách hóa xanh
  NearConvenienceStore: 10, // Gần cửa hàng tiện lợi
  NearSupermarket: 11, // Gần siêu thị
  NearPark: 12, // Gần công viên
  NearGym: 13, // Gần Phòng gym
  NearCafe: 14, // Gần quán cà phê
  NearRestaurant: 15, // Gần nhà hàng
  NearCinema: 16, // Gần rạp chiếu phim
  NearShoppingMall: 17, // Gần trung tâm thương mại
  NearAirport: 18, // Gần sân bay
  NearTrainStation: 19, // Gần ga tàu
} as const

export const FACILITY_ROOM_OPTIONS = [
  { label: 'Gần chợ', value: FACILITY_ROOM.NearMarket },
  { label: 'Gần trường học', value: FACILITY_ROOM.NearSchool },
  { label: 'Gần bệnh viện', value: FACILITY_ROOM.NearHospital },
  { label: 'Gần bến xe/bus', value: FACILITY_ROOM.NearBusStation },
  { label: 'Gần khu công nghiệp', value: FACILITY_ROOM.NearIndustrialPark },
  { label: 'Khu dân cư an ninh', value: FACILITY_ROOM.NearResidentialArea },
  { label: 'Gần ủy ban nhân dân', value: FACILITY_ROOM.NearPeopleCommittee },
  { label: 'Gần trạm xăng', value: FACILITY_ROOM.NearGasStation },
  { label: 'Gần bách hóa xanh', value: FACILITY_ROOM.NearGreenGrocery },
  { label: 'Gần cửa hàng tiện lợi', value: FACILITY_ROOM.NearConvenienceStore },
  { label: 'Gần siêu thị', value: FACILITY_ROOM.NearSupermarket },
  { label: 'Gần công viên', value: FACILITY_ROOM.NearPark },
  { label: 'Gần Phòng gym', value: FACILITY_ROOM.NearGym },
  { label: 'Gần quán cà phê', value: FACILITY_ROOM.NearCafe },
  { label: 'Gần nhà hàng', value: FACILITY_ROOM.NearRestaurant },
  { label: 'Gần rạp chiếu phim', value: FACILITY_ROOM.NearCinema },
  { label: 'Gần trung tâm thương mại', value: FACILITY_ROOM.NearShoppingMall },
  { label: 'Gần sân bay', value: FACILITY_ROOM.NearAirport },
  { label: 'Gần ga tàu', value: FACILITY_ROOM.NearTrainStation },
]

// Trạng thái dùng chung
export const FEATURED_STATUS = {
  NORMAL: 0, // Tin thường
  FEATURED: 1, // Tin nổi bât
} as const
