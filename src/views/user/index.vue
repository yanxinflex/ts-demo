<template>
  <div>
    <a-row type="flex" justify="end">
      <a-button type="primary" @click="showModal">新增</a-button>
    </a-row>
    <a-table :dataSource="userList" :columns="userColumns" rowKey="id">
      <template #action="{ record }">
        <a @click="showEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="del(record)">删除</a>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="新增" cancelText="取消" okText="确定" @ok="handleOk" width="450px">
      <a-form ref="formRef" :model="formState" :rules="rules" :wrapperCol="{ span: 21 }" :labelCol="{ span: 3 }">
        <a-form-item label="姓名" name="nickname">
          <a-input v-model:value="formState.nickname" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="账号" name="username">
          <a-input v-model:value="formState.username" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="formState.password" placeholder="请输入密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, UnwrapRef, reactive } from "vue";
import userModel from "@/api/user";
interface FormState {
  id?: number;
  nickname: string;
  username: string;
  password: string;
}
export default defineComponent({
  name: "UserIndex",
  setup() {
    const userColumns = [
      {
        title: "姓名",
        dataIndex: "nickname",
      },
      {
        title: "账号",
        dataIndex: "username",
      },
      {
        title: "密码",
        dataIndex: "password",
      },
      {
        title: "操作",
        dataIndex: "action",
        slots: { customRender: "action" },
        width: 200,
      },
    ];
    let userList = ref([]);
    const getUserList = async () => {
      userList.value = await userModel.list({});
    };

    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };
    const formRef = ref();
    let formState: UnwrapRef<FormState> = reactive({
      nickname: "",
      username: "",
      password: "",
    });
    const rules = {
      nickname: [{ required: true, message: "请输入名称", trigger: "blur" }],
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const showEdit = (data: any) => {
      formState.id = data.id;
      formState.nickname = data.nickname;
      formState.username = data.username;
      formState.password = data.password;
      visible.value = true;
    };
    const handleOk = () => {
      formRef.value.validate().then(async () => {
        await userModel[formState.id ? "update" : "add"](formState);
        visible.value = false;
        getUserList();
      });
    };
    const del = async (data: any) => {
      await userModel.del({ id: data.id });
      visible.value = false;
      getUserList();
    };
    return {
      userList,
      getUserList,
      userColumns,
      visible,
      showModal,
      handleOk,
      formRef,
      formState,
      rules,
      showEdit,
      del,
    };
  },
  async created() {
    await this.getUserList();
  },
});
</script>
