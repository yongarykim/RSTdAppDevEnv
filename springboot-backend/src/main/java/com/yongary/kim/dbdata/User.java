package com.yongary.kim.dbdata;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    String name;
    String email;
    String phone;
}
