package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "feed")
public class Feed {

    @Id
    private long feedCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(length = 20)
    private Long feedClassificationcode;

    @Column(length = 50)
    private String feedCategory;

    @Column(nullable = false, length = 50)
    private String feedDate;

    @Column(nullable = false, length = 2000)
    private String feedContent;

    @Column(nullable = false, length = 50)
    private String feedTag;

    @Transient
    private List<FeedFile> ffList;

    @Transient
    private List<FeedComment> fcList;

    @Transient
    private List<FeedLike> flList;

//    @Transient
//    private List<FeedTag> ftList;



}
