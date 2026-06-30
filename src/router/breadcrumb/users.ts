// useUserBreadcrumb.ts
export interface BreadcrumbLevel {
  hard_code: boolean
  name: string
  router_name?: string
}

export interface BreadcrumbItem {
  level_1?: BreadcrumbLevel
  level_2?: BreadcrumbLevel
  level_3?: BreadcrumbLevel
  title?: BreadcrumbLevel
}

export const useUserBreadcrumb = () => {
  const list = (): BreadcrumbItem => {
    return {
      level_1: {
        hard_code: true,
        name: 'Danh sách phòng',
      },
    }
  }

  const create = (): BreadcrumbItem => {
    return {
      level_1: {
        hard_code: true,
        name: 'Quản lý phòng',
      },
      level_2: {
        hard_code: true,
        name: 'Tạo phòng',
      },
      // level_3: {
      //   hard_code: true,
      //   name: 'create_room_type',
      // },
    }
  }

  const edit = (): BreadcrumbItem => {
    return {
      level_1: {
        hard_code: true,
        name: 'setting',
      },
      level_2: {
        hard_code: true,
        name: 'hotel_infors',
      },
      level_3: {
        hard_code: true,
        name: 'edit_room_type',
      },
    }
  }

  const detail = (): BreadcrumbItem => {
    return {
      level_1: {
        hard_code: true,
        name: 'Quản lý phòng',
      },
      level_2: {
        hard_code: true,
        name: 'Chi tiết phòng',
      },
    }
  }

  return {
    list,
    create,
    edit,
    detail,
  }
}
