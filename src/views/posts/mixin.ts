// src/composables/usePage.ts
import { ref, onMounted } from 'vue'
import { DIRECTION_ROOM, FACILITY_ROOM, PROJECT_STATUS } from './const'

export function usePage() {
  const setStatus = (status: number) => {
    switch (status) {
      case PROJECT_STATUS.PENDING:
        return 'Đang chờ xử lý'
      case PROJECT_STATUS.APPROVED:
        return 'Đã duyệt'
      case PROJECT_STATUS.REJECTED:
        return 'Bị từ chối'
      default:
        return ''
    }
  }

  const setTypeStatus = (status: number) => {
    switch (status) {
      case PROJECT_STATUS.PENDING:
        return 'warning'
      case PROJECT_STATUS.APPROVED:
        return 'success'
      case PROJECT_STATUS.REJECTED:
        return 'danger'
      default:
        return ''
    }
  }

  const setDirectionRoom = (status: number) => {
    switch (status) {
      case DIRECTION_ROOM.East:
        return 'Hướng Đông'
      case DIRECTION_ROOM.West:
        return 'Hướng Tây'
      case DIRECTION_ROOM.South:
        return 'Hướng Nam'
      case DIRECTION_ROOM.North:
        return 'Hướng Bắc'
      case DIRECTION_ROOM.Southeast:
        return 'Hướng Đông Nam'
      case DIRECTION_ROOM.Southwest:
        return 'Hướng Tây Nam'
      case DIRECTION_ROOM.Northeast:
        return 'Hướng Đông Bắc'
      case DIRECTION_ROOM.Northwest:
        return 'Hướng Tây Bắc'
      default:
        return ''
    }
  }

  const setFacilityRoom = (status: number) => {
    switch (status) {
      case FACILITY_ROOM.NearMarket:
        return 'Chợ'
      case FACILITY_ROOM.NearSchool:
        return 'trường học'
      case FACILITY_ROOM.NearHospital:
        return 'bệnh viện'
      case FACILITY_ROOM.NearBusStation:
        return 'bến xe/bus'
      case FACILITY_ROOM.NearIndustrialPark:
        return 'khu công nghiệp'
      case FACILITY_ROOM.NearResidentialArea:
        return 'Khu dân cư an ninh'
      case FACILITY_ROOM.NearPeopleCommittee:
        return 'ủy ban nhân dân'
      case FACILITY_ROOM.NearGasStation:
        return 'trạm xăng'
      case FACILITY_ROOM.NearGreenGrocery:
        return 'bách hóa xanh'
      case FACILITY_ROOM.NearConvenienceStore:
        return 'cửa hàng tiện lợi'
      case FACILITY_ROOM.NearSupermarket:
        return 'siêu thị'
      case FACILITY_ROOM.NearPark:
        return 'công viên'
      case FACILITY_ROOM.NearGym:
        return 'Phòng gym'
      case FACILITY_ROOM.NearCafe:
        return 'quán cà phê'
      case FACILITY_ROOM.NearRestaurant:
        return 'nhà hàng'
      case FACILITY_ROOM.NearCinema:
        return 'rạp chiếu phim'
      case FACILITY_ROOM.NearShoppingMall:
        return 'trung tâm thương mại'
      case FACILITY_ROOM.NearAirport:
        return 'sân bay'
      case FACILITY_ROOM.NearTrainStation:
        return 'ga tàu'
      default:
        return ''
    }
  }

  return {
    setStatus,
    setTypeStatus,
    setDirectionRoom,
    setFacilityRoom,
  }
}
