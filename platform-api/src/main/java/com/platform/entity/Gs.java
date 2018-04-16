package com.platform.entity;

import java.io.Serializable;


public class Gs implements Serializable {
    private static final long serialVersionUID = 1L;

    //
    private String ph;
    //
    private String latitude;
    //
    private Integer longitude;
    //
    private String address;

    public String getPh() {
//        return ph;
        return "12345678912";
    }

    public void setPh(String ph) {
        this.ph = ph;
    }

    public String getLatitude() {
//        return latitude;
        return "latitude";
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public Integer getLongitude() {
//        return longitude;
        return 1111111111;
    }

    public void setLongitude(Integer longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
//        return address;

        return "this is address";
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
