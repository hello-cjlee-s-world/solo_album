package com.cj.soloAlbum.user;

public class UserVO {
	String id;
	String name;
	String email;
	String creator;
	String modifier;
	String info;
	String pwd;
	int pwd_must_change;
	int pwd_change_time;
	int pwd_retry_count;
	int pwd_retry_time;
	String account_profile;
	int access_allow;
	int disabled;
	int locked;
	int login_policy_id;
	int last_logon_time;
	int create_time;
	int modify_time;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getModifier() {
		return modifier;
	}
	public void setModifier(String modifier) {
		this.modifier = modifier;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public int getPwd_must_change() {
		return pwd_must_change;
	}
	public void setPwd_must_change(int pwd_must_change) {
		this.pwd_must_change = pwd_must_change;
	}
	public int getPwd_change_time() {
		return pwd_change_time;
	}
	public void setPwd_change_time(int pwd_change_time) {
		this.pwd_change_time = pwd_change_time;
	}
	public int getPwd_retry_count() {
		return pwd_retry_count;
	}
	public void setPwd_retry_count(int pwd_retry_count) {
		this.pwd_retry_count = pwd_retry_count;
	}
	public int getPwd_retry_time() {
		return pwd_retry_time;
	}
	public void setPwd_retry_time(int pwd_retry_time) {
		this.pwd_retry_time = pwd_retry_time;
	}
	public String getAccount_profile() {
		return account_profile;
	}
	public void setAccount_profile(String account_profile) {
		this.account_profile = account_profile;
	}
	public int getAccess_allow() {
		return access_allow;
	}
	public void setAccess_allow(int access_allow) {
		this.access_allow = access_allow;
	}
	public int getDisabled() {
		return disabled;
	}
	public void setDisabled(int disabled) {
		this.disabled = disabled;
	}
	public int getLocked() {
		return locked;
	}
	public void setLocked(int locked) {
		this.locked = locked;
	}
	public int getLogin_policy_id() {
		return login_policy_id;
	}
	public void setLogin_policy_id(int login_policy_id) {
		this.login_policy_id = login_policy_id;
	}
	public int getLast_logon_time() {
		return last_logon_time;
	}
	public void setLast_logon_time(int last_logon_time) {
		this.last_logon_time = last_logon_time;
	}
	public int getCreate_time() {
		return create_time;
	}
	public void setCreate_time(int create_time) {
		this.create_time = create_time;
	}
	public int getModify_time() {
		return modify_time;
	}
	public void setModify_time(int modify_time) {
		this.modify_time = modify_time;
	}
	
	
	
}
