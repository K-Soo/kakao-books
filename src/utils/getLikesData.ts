import { storage } from "../utils/storage";

/**
 * 로컬 스토리지에서 'likeDB' 데이터를 가져옵니다.
 *
 * @template T - 반환될 데이터 타입
 * @returns {T} 로컬 스토리지에서 가져온 'likeDB' 데이터. 데이터가 없으면 빈 배열을 반환.
 */

export const getLikesData = <T extends {}>(): T => {
  const likeLocalStorageData = storage.getLocalStorageItem("likeDB");
  return likeLocalStorageData ?? [];
};
